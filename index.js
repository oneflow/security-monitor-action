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

		// Get GitHub Personal Access Token
		const ghPat = core.getInput('gh-pat', { required: true });
		const octokit = new Octokit({ auth: ghPat });

		const repoName = ctx.getRepoName(context);
		const repoOwner = ctx.getRepoOwner(context);
		const pullRequestHeadSha = ctx.getPullRequestHeadSha(context);
		const pullRequestNumber = ctx.getPullRequestNumber(context);
		const pullRequestCreator = ctx.getPullRequestCreator(context);
		const repoDefaultBranch = ctx.getDefaultBranch(context);
		const repoInfo = await action.getVulnerabilities(repoName, repoOwner, process.env.GITHUB_TOKEN || ghPat);
		const repoPRs = repoInfo.pullRequests.nodes;
		const [prInfo] = await _.filter(repoPRs, (node) => node.number === pullRequestNumber);
		const prCommits = prInfo.commits.nodes;
		const repoVulnerabilityAlerts = repoInfo.vulnerabilityAlerts.nodes;
		const criticalIssues = await _.filter(repoVulnerabilityAlerts, (node) =>
			node.securityVulnerability.severity.match(/CRITICAL|HIGH/),
		);
		const otherIssues = await _.filter(
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

		// check vulnerability alerts
		if (repoVulnerabilityAlerts.length) {
			// repo has vulnerability alerts
			console.log(
				`${context.payload.repository.name} repo has ${repoVulnerabilityAlerts.length} vulnerability alert(s)`,
			);
			if (criticalIssues.length) {
				const commitStatus = await action.findStatus(criticalIssues, prCommits, pullRequestCreator);
				const prMessage =
					commitStatus === 'failure'
						? criticalHighIssues(
								criticalIssues.length,
								await action.issuesMessage(repoInfo, criticalIssues),
						  )
						: criticalHighIssuesFixed;
				if (pullRequestCreator !== 'dependabot[bot]') {
					octokit.rest.issues.createComment({
						owner: repoOwner,
						repo: repoName,
						issue_number: pullRequestNumber,
						body: prMessage,
					});
				}
				await octokit.rest.repos.createCommitStatus({
					context: 'security-monitor',
					owner: repoOwner,
					repo: repoName,
					sha: pullRequestHeadSha,
					state: commitStatus,
				});
			} else {
				if (pullRequestCreator !== 'dependabot[bot]') {
					const commitStatus = await action.findStatus(otherIssues, prCommits, pullRequestCreator);
					const prMessage =
						commitStatus === 'failure'
							? minorIssues(await action.issuesMessage(repoInfo, otherIssues))
							: minorIssuesFixed;
					await octokit.rest.issues.createComment({
						owner: repoOwner,
						repo: repoName,
						issue_number: pullRequestNumber,
						body: prMessage,
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
		} else {
			// repo doesn't have any vulnerability alerts
			console.log(`${context.payload.repository.name} repo doesn't have any vulnerability alerts`);
			await octokit.rest.issues.createComment({
				owner: repoOwner,
				repo: repoName,
				issue_number: pullRequestNumber,
				body: noIssues,
			});
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
