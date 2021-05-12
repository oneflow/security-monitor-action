module.exports = {
	data: {
		repository: {
			pullRequests: {
				nodes: [
					{
						number: 15,
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
				nodes: [],
			},
		},
	},
};
