module.exports = {
	data: {
		repository: {
			pullRequests: {
				nodes: [
					{
						number: 15,
						title: 'Bump ini from 1.3.5 to 1.3.8',
						url: 'https://github.com/octocat/Hello-World/pull/5',
						commits: {
							nodes: [
								{
									commit: {
										messageHeadline: 'Bump ini from 1.3.5 to 1.3.8',
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
							severity: 'LOW',
							advisory: {
								severity: 'LOW',
								notificationsPermalink: 'https://github.com/advisories/GHSA-vh95-rmgr-6w4m/dependabot',
								summary: 'Prototype Pollution in minimist',
								description:
									'Affected versions of `minimist` are vulnerable to prototype pollution. Arguments are not properly sanitized, allowing an attacker to modify the prototype of `Object`, causing the addition or modification of an existing property that will exist on all objects.  \nParsing the argument `--__proto__.y=Polluted` adds a `y` property with value `Polluted` to all objects. The argument `--__proto__=Polluted` raises and uncaught error and crashes the application.  \nThis is exploitable if attackers have control over the arguments being passed to `minimist`.\n\n\n\n## Recommendation\n\nUpgrade to versions 0.2.1, 1.2.3 or later.',
							},
							package: {
								name: 'minimist',
							},
							updatedAt: '2020-04-03T21:42:10Z',
						},
					},
					{
						state: 'DISMISSED',
						securityVulnerability: {
							severity: 'LOW',
							advisory: {
								severity: 'LOW',
								notificationsPermalink: 'https://github.com/advisories/GHSA-p6mc-m468-83gw/dependabot',
								summary: 'Prototype Pollution in lodash',
								description:
									'Versions of lodash prior to 4.17.19 are vulnerable to Prototype Pollution. The function zipObjectDeep allows a malicious user to modify the prototype of Object if the property identifiers are user-supplied. Being affected by this issue requires zipping objects based on user-provided property arrays.\n\nThis vulnerability causes the addition or modification of an existing property that will exist on all objects and may lead to Denial of Service or Code Execution under specific circumstances.',
							},
							package: {
								name: 'lodash',
							},
							updatedAt: '2020-07-15T19:15:01Z',
						},
					},
					{
						state: 'OPEN',
						securityVulnerability: {
							severity: 'LOW',
							advisory: {
								severity: 'LOW',
								notificationsPermalink: 'https://github.com/advisories/GHSA-qqgx-2p2h-9c37/dependabot',
								summary: 'Prototype Pollution',
								description:
									"### Overview\nThe `ini` npm package before version 1.3.6 has a Prototype Pollution vulnerability.\n\nIf an attacker submits a malicious INI file to an application that parses it with `ini.parse`, they will pollute the prototype on the application. This can be exploited further depending on the context.\n\n### Patches\n\nThis has been patched in 1.3.6\n\n### Steps to reproduce\n\npayload.ini\n```\n[__proto__]\npolluted = \"polluted\"\n```\n\npoc.js:\n```\nvar fs = require('fs')\nvar ini = require('ini')\n\nvar parsed = ini.parse(fs.readFileSync('./payload.ini', 'utf-8'))\nconsole.log(parsed)\nconsole.log(parsed.__proto__)\nconsole.log(polluted)\n```\n\n```\n> node poc.js\n{}\n{ polluted: 'polluted' }\n{ polluted: 'polluted' }\npolluted\n```",
							},
							package: {
								name: 'ini',
							},
							updatedAt: '2020-12-10T16:51:40Z',
						},
					},
				],
			},
		},
	},
};
