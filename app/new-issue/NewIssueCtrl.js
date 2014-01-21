angular.module('it').controller('NewIssueCtrl', function($scope, util, GitHubService, LoginService, fields, template) {
  $scope.template = template;
  $scope.issue = {
    title: '',
    comments: '',
    fields: fields
  };

  function getBody() {
    var template = util.simpleCompile($scope.template.template, $scope.issue.fields, /{{field(\d)}}/g);
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