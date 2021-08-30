const { graphql } = require('@octokit/graphql');
const { _ } = require('lodash');
const { getVulnerabilityAlertsQuery } = require('../graphQL');

async function getVulnerabilities(repo, owner, token) {
	const { repository } = await graphql(getVulnerabilityAlertsQuery(repo, owner), {
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: 'application/vnd.github.vixen-preview+json',
		},
	});
	return repository;
}

async function issuesMessage(repoInfo, vulnerabilityIssues) {
	let issuesList = '';
	const vulnerabilityIssuesSorted = _.sortBy(vulnerabilityIssues, (issue) => {
		const rank = {
			CRITICAL: 1,
			HIGH: 2,
			LOW: 3,
			MODERATE: 4,
		};

		return rank[issue.securityVulnerability.severity];
	});
	await vulnerabilityIssuesSorted.forEach((issue) => {
		const packageName = issue.securityVulnerability.package.name;
		const issueLink = issue.securityVulnerability.advisory.notificationsPermalink;
		const issueSeverity = issue.securityVulnerability.severity;
		const prForPackage = new RegExp(`.*[B|b]ump\\s${packageName}\\s.*`);
		const pr = _.find(repoInfo.pullRequests.nodes, (node) => node.title.match(prForPackage));
		if (pr && pr.url && !issuesList.includes(pr.url) && !issuesList.includes(`[${packageName}]`)) {
			issuesList = `${issuesList}
- [${packageName}](${issueLink}) (${issueSeverity} severity). PR created by dependabot: ${pr.url}`;
		} else if (!issuesList.includes(`[${packageName}]`)) {
			issuesList = `${issuesList}
- [${packageName}](${issueLink}) (${issueSeverity} severity). PR created by dependabot: none`;
		}
	});
	return issuesList;
}

async function findStatus(issuesList, prCommits, prCreator, prTitle, prBody) {
	let statuses = [];
	if (prCreator.match(/dependabot\[bot\]|oneflow/)) {
		statuses.push('success');
	} else {
		await issuesList.forEach((issue) => {
			const packageName = issue.securityVulnerability.package.name;
			const unblock = new RegExp(`(.*bump\\s+${packageName})|(.*update\\s+vulnerable\\s+dependencies.*)`, 'i');
			prCommits.forEach((commit) => {
				statuses.push(
					_.some([commit.commit.messageHeadline, prTitle, prBody], (message) => message?.match(unblock))
						? 'success'
						: 'failure',
				);
			});
		});
	}
	const status = statuses.includes('success') ? 'success' : 'failure';
	return status;
}

module.exports = {
	getVulnerabilities,
	issuesMessage,
	findStatus,
};
