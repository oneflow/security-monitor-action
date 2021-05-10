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
	await vulnerabilityIssues.forEach((issue) => {
		const packageName = new RegExp(`.*bump\\s${issue.securityVulnerability.package.name}\\s.*`);
		const pr = _.find(repoInfo.pullRequests.nodes, (node) => node.title.match(packageName));
		if (pr && pr.url && !issuesList.includes(pr.url)) {
			issuesList = `${issuesList}
- [${issue.securityVulnerability.package.name}](${issue.securityVulnerability.advisory.notificationsPermalink}) (${
				issue.securityVulnerability.severity
			} severity). PR created by dependabot: ${pr ? pr.url : 'none'}`;
		}
	});
	return issuesList;
}

async function findStatus(issuesList, prCommits, prCreator) {
	let statuses = [];
	if (prCreator === 'dependabot[bot]') {
		statuses.push('success');
	} else {
		await issuesList.forEach((issue) => {
			const packageName = issue.securityVulnerability.package.name;
			prCommits.forEach((commit) => {
				statuses.push(commit.commit.messageHeadline.includes(packageName) ? 'success' : 'failure');
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
