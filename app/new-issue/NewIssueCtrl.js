angular.module('it').controller('NewIssueCtrl', function($scope, GitHubService, LoginService, fields) {
  $scope.issue = {
    title: '',
    comments: '',
    fields: fields
  };

  function getBody() {
    var template = $scope.template.template.replace(/\{\{field(\d)\}\}/g, function(match, fieldNum) {
      if ($scope.issue.fields[fieldNum]) {
        return $scope.issue.fields[fieldNum].value;
      } else {
        return match;
      }
    });
    return template + '\n\n' + $scope.issue.comments;
  }

  $scope.submitIssue = function() {
    var project = $scope.template.owner + '/' + $scope.template.repo;
    var issue = {
      title: $scope.issue.title,
      body: getBody()
    };
    var accessToken = $scope.user.accessToken;
    GitHubService.submitIssue(issue, accessToken, project);
  };
});