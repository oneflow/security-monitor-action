module.exports = {
	noIssues: "Congrats! The repository doesn't have any security vulnerability issues.",

	minorIssues: (issuesList) => `
Congrats! The repository doesn't have security issues with CRITICAL or HIGH severity.
You are good to go but it would be cool if you could review these PRs dependabot created for you or fix the issue yourself if there's no PR yet:
${issuesList}

If you're planning on fixing a dependency, make sure to include \`bump {packageName} from {version} to {version}\` into your commit message`,

	criticalHighIssues: (issuesCount, issuesList) => `
Your PR is blocked because this repository has ${issuesCount} security vulnerabillity issue(s) with critical or high severity:
${issuesList}

To unblock your PR you must fix security issues with CRITICAL or HIGH severity.

If there's no dependabot PR to fix the issue yet and you're planning on fixing it, make sure to include \`bump {packageName} from {version} to {version}\` into your commit message.

If you already fixed this issue in a different PR, please merge your branch with the default repo branch to unblock it.`,

	criticalHighIssuesFixed: 'It seems like your PR fixes one of the security vulnerability issues. Good job!',

	minorIssuesFixed: 'You did great fixing this vulnerability issue. :1st_place_medal:',
};
