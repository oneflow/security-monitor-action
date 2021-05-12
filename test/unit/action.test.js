const { issuesMessage } = require('../../src/github/action');
const repoInfo = require('./fixtures/graphql/repoInfo');

test('check message', async () => {
	const message = await issuesMessage(repoInfo.data.repository, repoInfo.data.repository.vulnerabilityAlerts.nodes);
	expect(message).toMatchSnapshot();
});
