angular.module('it').factory('GitHubService', function($http, util) {
  function convertUrl(url, obj) {
    return util.simpleCompile('https://api.github.com/' + url, obj);
  }

  return {
    getIssue: function(obj) {
      return $http({
        method: 'GET',
        url: convertUrl('repos/{{owner}}/{{repo}}/issues/{{number}}', obj)
      });
    },

    submitIssue: function(issue, accessToken, project) {
      return $http({
        method: 'POST',
        url: convertUrl('repos/{{project}}/issues', {project: project}),
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