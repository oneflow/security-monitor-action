module.exports = {
	data: {
		repository: {
			pullRequests: {
				nodes: [
					{
						number: 1,
						title: 'chore(deps): bump axios from 0.19.0 to 0.21.1',
						url: 'https://github.com/octocat/Hello-World/pull/1',
						commits: {
							nodes: [
								{
									commit: {
										messageHeadline: 'chore(deps): bump axios from 0.19.0 to 0.21.1',
									},
								},
							],
						},
					},
					{
						number: 2,
						title: 'chore(deps): bump pug-code-gen from 3.0.1 to 3.0.2',
						url: 'https://github.com/octocat/Hello-World/pull/2',
						commits: {
							nodes: [
								{
									commit: {
										messageHeadline: 'chore(deps): bump pug-code-gen from 3.0.1 to 3.0.2',
									},
								},
							],
						},
					},
					{
						number: 3,
						title: 'chore(deps): bump pug from 3.0.0 to 3.0.1',
						url: 'https://github.com/octocat/Hello-World/pull/3',
						commits: {
							nodes: [
								{
									commit: {
										messageHeadline: 'chore(deps): bump pug from 3.0.0 to 3.0.1',
									},
								},
							],
						},
					},
					{
						number: 4,
						title: 'chore(deps): bump handlebars from 4.1.2 to 4.7.7',
						url: 'https://github.com/octocat/Hello-World/pull/4',
						commits: {
							nodes: [
								{
									commit: {
										messageHeadline: 'chore(deps): bump handlebars from 4.1.2 to 4.7.7',
									},
								},
							],
						},
					},
					{
						number: 5,
						title: 'feat: some new feature',
						url: 'https://github.com/octocat/Hello-World/pull/5',
						commits: {
							nodes: [
								{
									commit: {
										messageHeadline: 'feat: some new feature',
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
						securityVulnerability: {
							severity: 'HIGH',
							advisory: {
								severity: 'HIGH',
								notificationsPermalink: 'https://github.com/advisories/GHSA-w457-6q6x-cgp9/dependabot',
								summary: 'Prototype Pollution in handlebars',
								description:
									"Versions of `handlebars` prior to 3.0.8 or 4.3.0 are vulnerable to Prototype Pollution leading to Remote Code Execution. Templates may alter an Objects' `__proto__` and `__defineGetter__` properties, which may allow an attacker to execute arbitrary code through crafted payloads.\n\n\n## Recommendation\n\nUpgrade to version 3.0.8, 4.3.0 or later.",
							},
							package: {
								name: 'handlebars',
							},
							updatedAt: '2019-12-26T17:55:41Z',
						},
					},
					{
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
						securityVulnerability: {
							severity: 'MODERATE',
							advisory: {
								severity: 'MODERATE',
								notificationsPermalink: 'https://github.com/advisories/GHSA-f52g-6jhx-586p/dependabot',
								summary: 'Denial of Service in handlebars',
								description:
									"Affected versions of `handlebars` are vulnerable to Denial of Service. The package's parser may be forced into an endless loop while processing specially-crafted templates. This may allow attackers to exhaust system resources leading to Denial of Service.\n\n\n## Recommendation\n\nUpgrade to version 4.4.5 or later.",
							},
							package: {
								name: 'handlebars',
							},
							updatedAt: '2020-08-31T18:54:26Z',
						},
					},
					{
						securityVulnerability: {
							severity: 'HIGH',
							advisory: {
								severity: 'HIGH',
								notificationsPermalink: 'https://github.com/advisories/GHSA-q2c6-c6pm-g3gh/dependabot',
								summary: 'Arbitrary Code Execution in handlebars',
								description:
									"Versions of `handlebars` prior to 3.0.8 or 4.5.3 are vulnerable to Arbitrary Code Execution. The package's lookup helper fails to properly validate templates, allowing attackers to submit templates that execute arbitrary JavaScript in the system. It is due to an incomplete fix for a [previous issue](https://www.npmjs.com/advisories/1316). This vulnerability can be used to run arbitrary code in a server processing Handlebars templates or on a victim's browser (effectively serving as Cross-Site Scripting).\n\n\n## Recommendation\n\nUpgrade to version 3.0.8, 4.5.3 or later.",
							},
							package: {
								name: 'handlebars',
							},
							updatedAt: '2020-08-31T18:55:15Z',
						},
					},
					{
						securityVulnerability: {
							severity: 'HIGH',
							advisory: {
								severity: 'HIGH',
								notificationsPermalink: 'https://github.com/advisories/GHSA-g9r4-xpmj-mj65/dependabot',
								summary: 'Prototype Pollution in handlebars',
								description:
									'Versions of `handlebars` prior to 3.0.8 or 4.5.3 are vulnerable to prototype pollution. It is possible to add or modify properties to the Object prototype through a malicious template. This may allow attackers to crash the application or execute Arbitrary Code in specific conditions.\n\n\n## Recommendation\n\nUpgrade to version 3.0.8, 4.5.3 or later.',
							},
							package: {
								name: 'handlebars',
							},
							updatedAt: '2020-08-31T18:55:14Z',
						},
					},
					{
						securityVulnerability: {
							severity: 'HIGH',
							advisory: {
								severity: 'HIGH',
								notificationsPermalink: 'https://github.com/advisories/GHSA-2cf5-4w76-r9qv/dependabot',
								summary: 'Arbitrary Code Execution in handlebars',
								description:
									'Versions of `handlebars` prior to 3.0.8 or 4.5.2 are vulnerable to Arbitrary Code Execution. The package\'s lookup helper fails to properly validate templates, allowing attackers to submit templates that execute arbitrary JavaScript in the system. It can be used to run arbitrary code in a server processing Handlebars templates or on a victim\'s browser (effectively serving as Cross-Site Scripting).\n\nThe following template can be used to demonstrate the vulnerability:  \n```{{#with "constructor"}}\n\t{{#with split as |a|}}\n\t\t{{pop (push "alert(\'Vulnerable Handlebars JS\');")}}\n\t\t{{#with (concat (lookup join (slice 0 1)))}}\n\t\t\t{{#each (slice 2 3)}}\n\t\t\t\t{{#with (apply 0 a)}}\n\t\t\t\t\t{{.}}\n\t\t\t\t{{/with}}\n\t\t\t{{/each}}\n\t\t{{/with}}\n\t{{/with}}\n{{/with}}```\n\n\n## Recommendation\n\nUpgrade to version 3.0.8, 4.5.2 or later.',
							},
							package: {
								name: 'handlebars',
							},
							updatedAt: '2020-08-31T18:54:53Z',
						},
					},
					{
						securityVulnerability: {
							severity: 'LOW',
							advisory: {
								severity: 'LOW',
								notificationsPermalink: 'https://github.com/advisories/GHSA-p9pc-299p-vxgp/dependabot',
								summary: 'Prototype Pollution in yargs-parser',
								description:
									"Affected versions of `yargs-parser` are vulnerable to prototype pollution. Arguments are not properly sanitized, allowing an attacker to modify the prototype of `Object`, causing the addition or modification of an existing property that will exist on all objects.  \nParsing the argument `--foo.__proto__.bar baz'` adds a `bar` property with value `baz` to all objects. This is only exploitable if attackers have control over the arguments being passed to `yargs-parser`.\n\n\n\n## Recommendation\n\nUpgrade to versions 13.1.2, 15.0.1, 18.1.1 or later.",
							},
							package: {
								name: 'yargs-parser',
							},
							updatedAt: '2020-11-10T21:06:04Z',
						},
					},
					{
						securityVulnerability: {
							severity: 'LOW',
							advisory: {
								severity: 'LOW',
								notificationsPermalink: 'https://github.com/advisories/GHSA-w7rc-rwvf-8q5r/dependabot',
								summary: "The `size` option isn't honored after following a redirect in node-fetch",
								description:
									"### Impact\nNode Fetch did not honor the `size` option after following a redirect, which means that when a content size was over the limit, a `FetchError` would never get thrown and the process would end without failure.\n\nFor most people, this fix will have a little or no impact. However, if you are relying on node-fetch to gate files above a size, the impact could be significant, for example: If you don't double-check the size of the data after `fetch()` has completed, your JS thread could get tied up doing work on a large file (DoS) and/or cost you money in computing.\n\n### Patches\nWe released patched versions for both stable and beta channels:\n\n- For `v2`: 2.6.1\n- For `v3`: 3.0.0-beta.9\n\n### Workarounds\nNone, it is strongly recommended to update as soon as possible.\n\n### For more information\nIf you have any questions or comments about this advisory:\n* Open an issue in [node-fetch](https://github.com/node-fetch/node-fetch/issues/new?assignees=&labels=question&template=support-or-usage.md&title=Question%3A+)\n* Contact one of the core maintainers.",
							},
							package: {
								name: 'node-fetch',
							},
							updatedAt: '2020-09-10T17:44:10Z',
						},
					},
					{
						securityVulnerability: {
							severity: 'HIGH',
							advisory: {
								severity: 'HIGH',
								notificationsPermalink: 'https://github.com/advisories/GHSA-4w2v-q235-vp99/dependabot',
								summary: 'Server-Side Request Forgery in Axios',
								description:
									'Axios NPM package 0.21.0 contains a Server-Side Request Forgery (SSRF) vulnerability where an attacker is able to bypass a proxy by providing a URL that responds with a redirect to a restricted host or IP address.',
							},
							package: {
								name: 'axios',
							},
							updatedAt: '2021-01-04T20:58:17Z',
						},
					},
					{
						securityVulnerability: {
							severity: 'HIGH',
							advisory: {
								severity: 'HIGH',
								notificationsPermalink: 'https://github.com/advisories/GHSA-p493-635q-r6gr/dependabot',
								summary: 'Remote code execution via the `pretty` option.',
								description:
									'### Impact\n\nIf a remote attacker was able to control the `pretty` option of the pug compiler, e.g. if you spread a user provided object such as the query parameters of a request into the pug template inputs, it was possible for them to achieve remote code execution on the node.js backend.\n\n### Patches\n\nUpgrade to `pug@3.0.1` or `pug-code-gen@3.0.2` or `pug-code-gen@2.0.3`, which correctly sanitise the parameter.\n\n### Workarounds\n\nIf there is no way for un-trusted input to be passed to pug as the `pretty` option, e.g. if you compile templates in advance before applying user input to them, you do not need to upgrade.\n\n### References\n\n\nOriginal report: https://github.com/pugjs/pug/issues/3312\n\n### For more information\n\nIf you believe you have found other vulnerabilities, please **DO NOT** open an issue. Instead, you can follow the instructions in our [Security Policy](https://github.com/pugjs/pug/blob/master/SECURITY.md)',
							},
							package: {
								name: 'pug-code-gen',
							},
							updatedAt: '2021-03-03T01:49:23Z',
						},
					},
					{
						securityVulnerability: {
							severity: 'HIGH',
							advisory: {
								severity: 'HIGH',
								notificationsPermalink: 'https://github.com/advisories/GHSA-p493-635q-r6gr/dependabot',
								summary: 'Remote code execution via the `pretty` option.',
								description:
									'### Impact\n\nIf a remote attacker was able to control the `pretty` option of the pug compiler, e.g. if you spread a user provided object such as the query parameters of a request into the pug template inputs, it was possible for them to achieve remote code execution on the node.js backend.\n\n### Patches\n\nUpgrade to `pug@3.0.1` or `pug-code-gen@3.0.2` or `pug-code-gen@2.0.3`, which correctly sanitise the parameter.\n\n### Workarounds\n\nIf there is no way for un-trusted input to be passed to pug as the `pretty` option, e.g. if you compile templates in advance before applying user input to them, you do not need to upgrade.\n\n### References\n\n\nOriginal report: https://github.com/pugjs/pug/issues/3312\n\n### For more information\n\nIf you believe you have found other vulnerabilities, please **DO NOT** open an issue. Instead, you can follow the instructions in our [Security Policy](https://github.com/pugjs/pug/blob/master/SECURITY.md)',
							},
							package: {
								name: 'pug',
							},
							updatedAt: '2021-03-03T01:49:23Z',
						},
					},
					{
						securityVulnerability: {
							severity: 'CRITICAL',
							advisory: {
								severity: 'CRITICAL',
								notificationsPermalink: 'https://github.com/advisories/GHSA-f2jv-r9rf-7988/dependabot',
								summary: 'Remote code execution in handlebars when compiling templates',
								description:
									'The package handlebars before 4.7.7 are vulnerable to Remote Code Execution (RCE) when selecting certain compiling options to compile templates coming from an untrusted source.',
							},
							package: {
								name: 'handlebars',
							},
							updatedAt: '2021-04-13T22:07:11Z',
						},
					},
				],
			},
		},
	},
};
