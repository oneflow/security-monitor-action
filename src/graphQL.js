module.exports = {
	getVulnerabilityAlertsQuery: (repo, owner) => `
  {
    repository(name: "${repo}", owner: "${owner}") {
      pullRequests(first: 100, states: OPEN) {
        nodes {
			number
            title
            url
			commits(first: 100) {
				nodes {
					commit {
						messageHeadline
					}
				}
			}
        }
      }
      vulnerabilityAlerts(first: 100) {
        nodes {
          state
          securityVulnerability {
                      severity
                      advisory {
                          severity
                          notificationsPermalink
                          summary
                          description
                      }
                      package {
                          name
                      }
                      updatedAt
                  }
        }
      }
    }
  }
`,
};
