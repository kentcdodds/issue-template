angular.module('it').factory('GitHubService', function($http) {
  return {
    submitIssue: function(issue, accessToken, project) {
      return $http({
        method: 'POST',
        url: 'https://api.github.com/repos/' + project + '/issues',
        params: {
          access_token: accessToken
        },
        data: {
          title: issue.title,
          body: issue.body
        }
      });
    }
  }
});