const { issuesMessage } = require('../../src/github/action');
const repoInfo = require('./fixtures/graphql/repoInfo');

test('check message', async () => {
	const message = await issuesMessage(repoInfo.data.repository, repoInfo.data.repository.vulnerabilityAlerts.nodes);
	const expected = `- [handlebars](https://github.com/advisories/GHSA-f2jv-r9rf-7988/dependabot) (CRITICAL severity). PR created by dependabot: https://github.com/octocat/Hello-World/pull/4
- [axios](https://github.com/advisories/GHSA-4w2v-q235-vp99/dependabot) (HIGH severity). PR created by dependabot: https://github.com/octocat/Hello-World/pull/1
- [pug-code-gen](https://github.com/advisories/GHSA-p493-635q-r6gr/dependabot) (HIGH severity). PR created by dependabot: https://github.com/octocat/Hello-World/pull/2
- [pug](https://github.com/advisories/GHSA-p493-635q-r6gr/dependabot) (HIGH severity). PR created by dependabot: https://github.com/octocat/Hello-World/pull/3
- [minimist](https://github.com/advisories/GHSA-vh95-rmgr-6w4m/dependabot) (LOW severity). PR created by dependabot: none
- [yargs-parser](https://github.com/advisories/GHSA-p9pc-299p-vxgp/dependabot) (LOW severity). PR created by dependabot: none
- [node-fetch](https://github.com/advisories/GHSA-w7rc-rwvf-8q5r/dependabot) (LOW severity). PR created by dependabot: none`;
	expect(message).toEqual(expect.stringContaining(expected));
});
