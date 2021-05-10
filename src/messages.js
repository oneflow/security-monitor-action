module.exports = {
	noIssues: "Congrats! The repository doesn't have any security vulnerability issues.",

	minorIssues: (issuesList) => `
Congrats! The repository doesn't have security issues with CRITICAL or HIGH severity.
You are good to go but it would be cool if you could review these PRs dependabot created for you or fix the issue yourself if there's no PR yet:
${issuesList}`,

	criticalHighIssues: (issuesCount, issuesList) => `
Your PR is blocked because this repository has ${issuesCount} security vulnerabillity issue(s) with critical or high severity:
${issuesList}

To unblock your PR you must fix security issues with CRITICAL or HIGH severity.
If you already fixed this issue in a different PR, please merge your branch with the default repo branch to unblock it.`,

	criticalHighIssuesFixed: 'It seems like your PR fixes one of the security vulnerability issues. Good job!',
};
