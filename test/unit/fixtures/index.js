const graphqlNoIssues = require('./graphql/noIssues');
const graphqlOneHighIssue = require('./graphql/oneHighIssue');
const graphqlOneHighIssueWithFix = require('./graphql/oneHighIssueWithFix');
const graphqlOnlyMinorIssues = require('./graphql/onlyMinorIssues');
const pullRequestEvent = require('./ghEvents/pullRequestEvent');
const pullRequestEventDepBot = require('./ghEvents/pullRequestEventDepBot');

module.exports = {
	graphqlNoIssues,
	graphqlOneHighIssue,
	graphqlOneHighIssueWithFix,
	graphqlOnlyMinorIssues,
	pullRequestEvent,
	pullRequestEventDepBot,
};
