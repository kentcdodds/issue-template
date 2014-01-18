angular.module('it').controller('NewIssueCtrl', function($scope, $firebase, $http, $routeParams, LoginService, TemplateService) {
  $scope.template = TemplateService.getTemplate({
    name: $routeParams.name,
    owner: $routeParams.owner,
    repo: $routeParams.repo
  });
  $scope.issue = {
    title: 'This is a title',
    comments: 'This is a comment',
    fields: []
  };

  $scope.template.$on('loaded', function() {
    $scope.issue.fields = angular.copy($scope.template.fields);
  });

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
    $http({
      method: 'POST',
      url: 'https://api.github.com/repos/' + $scope.template.owner + '/' + $scope.template.repo + '/issues',
      params: {
        access_token: LoginService.getUser().accessToken
      },
      data: {
        title: $scope.issue.title,
        body: getBody()
      }
    }).success(function(data) {
        $scope.issueUrl = data['html_url'];
      });
  };
});