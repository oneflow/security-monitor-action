const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require('@octokit/rest');
const { _ } = require('lodash');
const action = require('./src/github/action');
const ctx = require('./src/github/context');
const {
	noIssues,
	minorIssues,
	criticalHighIssues,
	criticalHighIssuesFixed,
	minorIssuesFixed,
} = require('./src/messages');

run();

async function run() {
	try {
		// Get github context data
		const context = github.context;

		// Get the JSON webhook payload for the event that triggered the workflow
		const payload = JSON.stringify(context.payload, undefined, 2);
		console.log(`The event payload: ${payload}`);

		// Get GitHub Personal Access Token and user name
		const ghPat = core.getInput('gh-pat', { required: true });
		const actionUser = core.getInput('action-user', { required: true });
		const octokit = new Octokit({ auth: ghPat });

		const repoName = ctx.getRepoName(context);
		const repoOwner = ctx.getRepoOwner(context);
		const pullRequestHeadSha = ctx.getPullRequestHeadSha(context);
		const pullRequestNumber = ctx.getPullRequestNumber(context);
		const pullRequestTitle = ctx.getPullRequestTitle(context);
		const pullRequestBody = ctx.getPullRequestBody(context);
		const pullRequestCreator = ctx.getPullRequestCreator(context);
		const repoDefaultBranch = ctx.getDefaultBranch(context);
		const repoInfo = await action.getVulnerabilities(repoName, repoOwner, process.env.GITHUB_TOKEN || ghPat);
		const repoPRs = repoInfo.pullRequests.nodes;
		const [prInfo] = _.filter(repoPRs, (node) => node.number === pullRequestNumber);
		const prCommits = prInfo.commits.nodes;
		const repoVulnerabilityAlerts = _.filter(repoInfo.vulnerabilityAlerts.nodes, { state: 'OPEN' });
		const criticalIssues = _.filter(repoVulnerabilityAlerts, (node) =>
			node.securityVulnerability.severity.match(/CRITICAL|HIGH/),
		);
		const otherIssues = _.filter(
			repoVulnerabilityAlerts,
			(node) => !node.securityVulnerability.severity.match(/CRITICAL|HIGH/),
		);
		console.log(`Repo alerts: ${JSON.stringify(repoVulnerabilityAlerts, undefined, 2)}`);
		// make 'security-monitor' status check required if it's not
		const requiredStatusChecks = await octokit.rest.repos.getAllStatusCheckContexts({
			owner: repoOwner,
			repo: repoName,
			branch: repoDefaultBranch,
		});
		if (!requiredStatusChecks.data.includes('security-monitor')) {
			requiredStatusChecks.data.push('security-monitor');
			await octokit.rest.repos.updateStatusCheckProtection({
				owner: repoOwner,
				repo: repoName,
				branch: repoDefaultBranch,
				contexts: requiredStatusChecks.data,
			});
		}
		// check if PR already has a comment from the action.
		const prComments = await octokit.rest.issues.listComments({
			owner: repoOwner,
			repo: repoName,
			issue_number: pullRequestNumber,
		});
		let actionComment;
		if (prComments.data.length) {
			actionComment = _.findLast(
				prComments.data,
				(comment) => comment.user.login === (process.env.GITHUB_ACTION_USER || actionUser),
			);
		}

		// check vulnerability alerts
		if (repoVulnerabilityAlerts.length) {
			// repo has vulnerability alerts
			console.log(
				`${context.payload.repository.name} repo has ${repoVulnerabilityAlerts.length} vulnerability alert(s)`,
			);
			if (criticalIssues.length) {
				const commitStatus = await action.findStatus(
					criticalIssues,
					prCommits,
					pullRequestCreator,
					pullRequestTitle,
					pullRequestBody,
				);
				const prMessage =
					commitStatus === 'failure'
						? criticalHighIssues(
								criticalIssues.length,
								await action.issuesMessage(repoInfo, criticalIssues),
						  )
						: criticalHighIssuesFixed;
				if (!pullRequestCreator.match(/dependabot\[bot\]|oneflow/)) {
					if (actionComment) {
						await octokit.rest.issues.updateComment({
							owner: repoOwner,
							repo: repoName,
							comment_id: actionComment.id,
							body: `${prMessage}\n\n_Latest update timestamp: ${new Date().toISOString()}_`,
						});
					} else {
						await octokit.rest.issues.createComment({
							owner: repoOwner,
							repo: repoName,
							issue_number: pullRequestNumber,
							body: prMessage,
						});
					}
				}
				await octokit.rest.repos.createCommitStatus({
					context: 'security-monitor',
					owner: repoOwner,
					repo: repoName,
					sha: pullRequestHeadSha,
					state: commitStatus,
				});
			} else {
				if (!pullRequestCreator.match(/dependabot\[bot\]|oneflow/)) {
					const commitStatus = await action.findStatus(
						otherIssues,
						prCommits,
						pullRequestCreator,
						pullRequestTitle,
						pullRequestBody,
					);
					const prMessage =
						commitStatus === 'failure'
							? minorIssues(await action.issuesMessage(repoInfo, otherIssues))
							: minorIssuesFixed;
					if (actionComment) {
						await octokit.rest.issues.updateComment({
							owner: repoOwner,
							repo: repoName,
							comment_id: actionComment.id,
							body: `${prMessage}\n\n_Latest update timestamp: ${new Date().toISOString()}_`,
						});
					} else {
						await octokit.rest.issues.createComment({
							owner: repoOwner,
							repo: repoName,
							issue_number: pullRequestNumber,
							body: prMessage,
						});
					}
				}
				await octokit.rest.repos.createCommitStatus({
					context: 'security-monitor',
					owner: repoOwner,
					repo: repoName,
					sha: pullRequestHeadSha,
					state: 'success',
				});
			}
		} else {
			// repo doesn't have any vulnerability alerts
			console.log(`${context.payload.repository.name} repo doesn't have any vulnerability alerts`);
			if (actionComment) {
				await octokit.rest.issues.updateComment({
					owner: repoOwner,
					repo: repoName,
					comment_id: actionComment.id,
					body: `${noIssues}\n\n_Latest update timestamp: ${new Date().toISOString()}_`,
				});
			} else {
				await octokit.rest.issues.createComment({
					owner: repoOwner,
					repo: repoName,
					issue_number: pullRequestNumber,
					body: noIssues,
				});
			}
			await octokit.rest.repos.createCommitStatus({
				context: 'security-monitor',
				owner: repoOwner,
				repo: repoName,
				sha: pullRequestHeadSha,
				state: 'success',
			});
		}
	} catch (error) {
		core.setFailed(error.message);
	}
}

module.exports = {
	run,
};
