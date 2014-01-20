angular.module('it').factory('GitHubService', function($http) {
  function convertUrl(url, obj) {
    return 'https://api.github.com' + url.replace(/\{\{(.)\}\}/g, function(match, propName) {
      if (obj[propName]) {
        return obj[propName];
      } else {
        return match;
      }
    });
  }

  return {
    getIssue: function(obj) {
      return $http({
        method: 'GET',
        url: convertUrl('/repos/{{owner}}/{{repo}}/issues/{{number}}', obj)
      });
    },
    submitIssue: function(issue, accessToken, project) {
      return $http({
        method: 'POST',
        url: convertUrl('/repos/{{project}}/issues', {project: project}),
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