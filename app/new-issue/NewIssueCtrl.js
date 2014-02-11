angular.module('it').controller('NewIssueCtrl', function($scope, $sce, $filter, util, markdown, GitHubService, LoginService, fields, template, _, toastr, issue) {
  $scope.template = template;
  $scope.updating = !!issue;

  $scope.resetIssue = function() {
    if ($scope.issueSubmitted) {
      issue = null;
      $scope.issueSubmitted = false;
    }
    $scope.issue = {
      title: '',
      comments: '',
      fields: fields
    };
    $scope.issueUrl = '';
    if (issue && issue.data) {
      $scope.issueUrl = issue.data['html_url'];
      $scope.issue.title = issue.data.title;
      $scope.issue.comments = issue.data.body;
    }
  };

  $scope.resetIssue();

  _.each($scope.issue.fields, function(field) {
    switch (field.element) {
      case 'select':
        field.enteredValue = field.value.split(',')[0];
        break;
      case 'input':
        //noinspection FallThroughInSwitchStatementJS
        switch (field.type) {
          case 'checkbox':
            field.selectedValues = [];
          case 'radio':
            field.enteredValue = (field.value || '').split(',')[0];;
            break;
          default:
            field.enteredValue = field.value;
        }
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
      title: $scope.issue.title || ' '
    });
  }

  function compileTemplate(string) {
    var cleanedFields = $scope.issue.fields;
    _.each(cleanedFields, function(field) {
      switch (field.type) {
        case 'checkbox':
          field.enteredValue = _.compact(field.selectedValues).join(', ');
          break;
      }
    });
    return util.simpleCompile(string, cleanedFields, /{{field(\d)}}/g, 'enteredValue');
  }

  function generateIssue() {
    return {
      title: compileTemplate(compileTitle($scope.template.titleTemplate)),
      body: getBody()
    }
  }

  function hideCommentsAndHTMLize(input) {
    return markdown.toHTML(input.replace(/<!--.*?-->/g, ''));
  }

  $scope.$watch('issue', function() {
    $scope.preview = generateIssue();
    $scope.preview.body = $sce.trustAsHtml(hideCommentsAndHTMLize($scope.preview.body));
  }, true);

  $scope.submitIssue = function() {
    var owner = $scope.template.owner;
    var repo = $scope.template.repo;
    var accessToken = $scope.user.accessToken;
    function success(data) {
      $scope.issueUrl = data['html_url'];
      $scope.issueSubmitted = true;
    }

    function error() {
      toastr.error('There was a problem submitting your issue... Please let us know...', 'Error...');
    }

    if (issue && issue.data) {
      GitHubService.updateIssue(generateIssue(), accessToken, owner, repo, issue.data.number).success(success).error(error);
    } else {
      GitHubService.submitIssue(generateIssue(), accessToken, owner, repo).success(success).error(error);
    }
  };
});