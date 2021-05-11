const context = require('../../src/github/context');
const prEvent = require('./fixtures/ghEvents/pullRequestEvent');

test('get repo owner', () => {
	const ctx = { payload: prEvent };
	expect(context.getRepoOwner(ctx)).toBe('octocat');
});

test('get repo name', () => {
	const ctx = { payload: prEvent };
	expect(context.getRepoName(ctx)).toBe('Hello-World');
});

test('get repo url', () => {
	const ctx = { payload: prEvent };
	expect(context.getRepoUrl(ctx)).toBe('https://github.com/octocat/Hello-World');
});

test('get pull request url', () => {
	const ctx = { payload: prEvent };
	expect(context.getPullRequestUrl(ctx)).toBe('https://api.github.com/repos/octocat/Hello-World/pulls/15');
});

test('get pull request sender', () => {
	const ctx = { payload: prEvent };
	expect(context.getPullRequestCreator(ctx)).toBe('octocat');
});

test('get pull request number', () => {
	const ctx = { payload: prEvent };
	expect(context.getPullRequestNumber(ctx)).toBe(15);
});

test('get pull request head sha', () => {
	const ctx = { payload: prEvent };
	expect(context.getPullRequestHeadSha(ctx)).toBe('aaaa1111');
});

test('get repo refault branch', () => {
	const ctx = { payload: prEvent };
	expect(context.getDefaultBranch(ctx)).toBe('master');
});
