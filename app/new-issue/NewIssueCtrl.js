angular.module('it').controller('NewIssueCtrl', function($scope, util, GitHubService, LoginService, fields, template, _, toastr) {
  $scope.template = template;

  $scope.resetIssue = function() {
    $scope.issue = {
      title: '',
      comments: '',
      fields: fields
    };
    $scope.issueUrl = '';
  };

  $scope.resetIssue();

  _.each($scope.issue.fields, function(field) {
    switch (field.element) {
      case 'select':
        field.enteredValue = field.value.split(',')[0];
        break;
      default:
        field.enteredValue = field.value;
    }
  });

  $scope.$watch('template.owner && template.repo && user.login', function() {
    if ($scope.template.owner && $scope.template.repo && $scope.user && $scope.user.login) {
      GitHubService.checkUserIsCollaborator($scope.template.owner, $scope.template.repo, $scope.user.login).then(function(isCollaborator) {
        $scope.isCollaborator = isCollaborator;
      });
    }
  });


  function getBody() {
    var template = compileTitle(compileTemplate($scope.template.template));
    return template + '\n\n' + $scope.issue.comments;
  }

  function compileTitle(string) {
    return util.simpleCompile(string, {
      title: $scope.issue.title
    });
  }

  function compileTemplate(string) {
    return util.simpleCompile(string, $scope.issue.fields, /{{field(\d)}}/g, 'enteredValue');
  }

  function generateIssue() {
    return {
      title: compileTemplate(compileTitle($scope.template.titleTemplate)),
      body: getBody()
    }
  }

  $scope.$watch('issue', function() {
    $scope.preview = generateIssue();
  }, true);

  $scope.submitIssue = function() {
    var project = $scope.template.owner + '/' + $scope.template.repo;
    var accessToken = $scope.user.accessToken;
    GitHubService.submitIssue(generateIssue(), accessToken, project).success(function(data) {
      $scope.issueUrl = data['html_url'];
    }).error(function() {
      toastr.error('There was a problem submitting your issue... Please let us know...', 'Error...');
    });
  };
});