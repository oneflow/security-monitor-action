module.exports = {
	data: {
		repository: {
			pullRequests: {
				nodes: [
					{
						number: 15,
						title: 'Bump lodash from 4.17.11 to 4.17.20',
						url: 'https://github.com/octocat/Hello-World/pull/2',
						commits: {
							nodes: [
								{
									commit: {
										messageHeadline: 'Bump lodash from 4.17.11 to 4.17.21',
									},
								},
							],
						},
					},
				],
			},
			vulnerabilityAlerts: {
				nodes: [
					{
						state: 'OPEN',
						securityVulnerability: {
							severity: 'HIGH',
							advisory: {
								severity: 'HIGH',
								notificationsPermalink: 'https://github.com/advisories/GHSA-jf85-cpcp-j695/dependabot',
								summary: 'Prototype Pollution in lodash',
								description:
									'Versions of `lodash` before 4.17.12 are vulnerable to Prototype Pollution.  The function `defaultsDeep` allows a malicious user to modify the prototype of `Object` via `{constructor: {prototype: {...}}}` causing the addition or modification of an existing property that will exist on all objects.\n\n\n\n\n## Recommendation\n\nUpdate to version 4.17.12 or later.',
							},
							package: {
								name: 'lodash',
							},
							updatedAt: '2019-12-05T17:37:10Z',
						},
					},
				],
			},
		},
	},
};
