function getRepoOwner(context) {
	return context.payload.repository.owner.login;
}

function getRepoName(context) {
	return context.payload.repository.name;
}

function getRepoUrl(context) {
	return context.payload.repository.html_url;
}

function getPullRequestUrl(context) {
	return context.payload.pull_request.url;
}

function getPullRequestCreator(context) {
	return context.payload.pull_request.user.login;
}

function getPullRequestNumber(context) {
	return context.payload.pull_request.number;
}

function getPullRequestHeadSha(context) {
	return context.payload.pull_request.head.sha;
}

function getDefaultBranch(context) {
	return context.payload.repository.default_branch;
}

module.exports = {
	getRepoOwner,
	getRepoName,
	getRepoUrl,
	getPullRequestUrl,
	getPullRequestCreator,
	getPullRequestNumber,
	getPullRequestHeadSha,
	getDefaultBranch,
};
