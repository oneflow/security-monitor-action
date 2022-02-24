const { issuesMessage, findStatus } = require('../../src/github/action');
const repoInfo = require('./fixtures/graphql/repoInfo');

test('check message', async () => {
	const message = await issuesMessage(repoInfo.data.repository, repoInfo.data.repository.vulnerabilityAlerts.nodes);
	expect(message).toMatchSnapshot();
});

describe('find status', () => {
	const issue = [
		{
			state: 'OPEN',
			securityVulnerability: {
				severity: 'HIGH',
				advisory: {
					severity: 'HIGH',
				},
				package: {
					name: 'lodash',
				},
			},
		},
	];

	const commit = [{ commit: { messageHeadline: 'fix: something' } }];
	const commitWithFix = [{ commit: { messageHeadline: 'chore: bump lodash' } }];

	test('oneflow PR', async () => {
		const message = await findStatus(issue, commit, 'oneflow', 'some title', 'some body');
		expect(message).toBe('success');
	});

	test('dependabot[bot] PR', async () => {
		const message = await findStatus(issue, commit, 'dependabot[bot]', 'some title', 'some body');
		expect(message).toBe('success');
	});

	test('empty PR body', async () => {
		const message = await findStatus(issue, commit, 'user', 'some title', null);
		expect(message).toBe('failure');
	});

	test('PR body with fix message', async () => {
		const message = await findStatus(issue, commit, 'user', 'some title', 'update vulnerable dependencies');
		expect(message).toBe('success');
	});

	test('commit with fix message', async () => {
		const message = await findStatus(issue, commitWithFix, 'user', 'some title', 'some description');
		expect(message).toBe('success');
	});
});
