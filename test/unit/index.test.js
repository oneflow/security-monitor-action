jest.mock('@actions/core');
jest.mock('@actions/github');

const core = require('@actions/core');
const { context } = require('@actions/github');
const nock = require('nock');
const { run } = require('../..');

const fixture = require('./fixtures');

describe('security check app', () => {
	let githubScope;

	nock.disableNetConnect();

	beforeEach(() => {
		githubScope = nock('https://api.github.com');
		core.getInput = jest.fn().mockReturnValue('token');
	});

	afterEach(() => {
		nock.cleanAll();
	});

	test('custom PR, there are no vulnerability issues and security status check is already set as required', async () => {
		context.payload = fixture.pullRequestEvent;
		getVulnerabilities = jest.fn().mockReturnValueOnce(fixture.graphqlNoIssues);
		githubScope
			.post('/graphql')
			.reply(200, fixture.graphqlNoIssues)
			.get('/repos/octocat/Hello-World/branches/master/protection/required_status_checks/contexts')
			.reply(200, ['default', 'security-monitor'])
			.post('/repos/octocat/Hello-World/issues/15/comments')
			.reply(200)
			.post('/repos/octocat/Hello-World/statuses/aaaa1111')
			.reply(200)
			.post('/graphql')
			.reply(200);
		await run();
	});

	test('custom PR, action updates status check protection', async () => {
		context.payload = fixture.pullRequestEvent;
		getVulnerabilities = jest.fn().mockReturnValue(fixture.graphqlOneHighIssue);
		githubScope
			.post('/graphql')
			.reply(200, fixture.graphqlOneHighIssue)
			.get('/repos/octocat/Hello-World/branches/master/protection/required_status_checks/contexts')
			.reply(200, ['default'])
			.patch('/repos/octocat/Hello-World/branches/master/protection/required_status_checks')
			.reply(200)
			.post('/repos/octocat/Hello-World/issues/15/comments')
			.reply(200)
			.post('/repos/octocat/Hello-World/statuses/aaaa1111')
			.reply(200)
			.post('/graphql')
			.reply(200);
		await run();
	});

	test('custom PR, there is one High vulnerability issues and security status check is already set as required', async () => {
		context.payload = fixture.pullRequestEvent;
		getVulnerabilities = jest.fn().mockReturnValue(fixture.graphqlOneHighIssue);
		githubScope
			.post('/graphql')
			.reply(200, fixture.graphqlOneHighIssue)
			.get('/repos/octocat/Hello-World/branches/master/protection/required_status_checks/contexts')
			.reply(200, ['default', 'security-monitor'])
			.post('/repos/octocat/Hello-World/issues/15/comments')
			.reply(200)
			.post('/repos/octocat/Hello-World/statuses/aaaa1111')
			.reply(200)
			.post('/graphql')
			.reply(200);
		await run();
	});

	test('custom PR, there is one High vulnerability issues with fix and security status check is already set as required', async () => {
		context.payload = fixture.pullRequestEvent;
		getVulnerabilities = jest.fn().mockReturnValue(fixture.graphqlOneHighIssue);
		githubScope
			.post('/graphql')
			.reply(200, fixture.graphqlOneHighIssue)
			.get('/repos/octocat/Hello-World/branches/master/protection/required_status_checks/contexts')
			.reply(200, ['default', 'security-monitor'])
			.post('/repos/octocat/Hello-World/issues/15/comments')
			.reply(200)
			.post('/repos/octocat/Hello-World/statuses/aaaa1111')
			.reply(200)
			.post('/graphql')
			.reply(200);
		await run();
	});

	test('dependabot PR, there is one High vulnerability issues with fix from dependabot and security status check is already set as required', async () => {
		context.payload = fixture.pullRequestEventDepBot;
		getVulnerabilities = jest.fn().mockReturnValue(fixture.graphqlOneHighIssue);
		githubScope
			.post('/graphql')
			.reply(200, fixture.graphqlOneHighIssue)
			.get('/repos/octocat/Hello-World/branches/master/protection/required_status_checks/contexts')
			.reply(200, ['default', 'security-monitor'])
			.post('/repos/octocat/Hello-World/issues/15/comments')
			.reply(200)
			.post('/repos/octocat/Hello-World/statuses/aaaa1111')
			.reply(200)
			.post('/graphql')
			.reply(200);
		await run();
	});

	test('custom PR, there are only minor vulnerability issues and security status check is already set as required', async () => {
		context.payload = fixture.pullRequestEvent;
		getVulnerabilities = jest.fn().mockReturnValue(fixture.graphqlOnlyMinorIssues);
		githubScope
			.post('/graphql')
			.reply(200, fixture.graphqlOnlyMinorIssues)
			.get('/repos/octocat/Hello-World/branches/master/protection/required_status_checks/contexts')
			.reply(200, ['default', 'security-monitor'])
			.post('/repos/octocat/Hello-World/issues/15/comments')
			.reply(200)
			.post('/repos/octocat/Hello-World/statuses/aaaa1111')
			.reply(200)
			.post('/graphql')
			.reply(200);
		await run();
	});

	test('dependabot PR, there are only minor vulnerability issues and security status check is already set as required', async () => {
		context.payload = fixture.pullRequestEventDepBot;
		getVulnerabilities = jest.fn().mockReturnValue(fixture.graphqlOnlyMinorIssues);
		githubScope
			.post('/graphql')
			.reply(200, fixture.graphqlOnlyMinorIssues)
			.get('/repos/octocat/Hello-World/branches/master/protection/required_status_checks/contexts')
			.reply(200, ['default', 'security-monitor'])
			.post('/repos/octocat/Hello-World/issues/15/comments')
			.reply(200)
			.post('/repos/octocat/Hello-World/statuses/aaaa1111')
			.reply(200)
			.post('/graphql')
			.reply(200);
		await run();
	});
});
