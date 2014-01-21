angular.module('it').controller('TemplateCtrl', function($scope, $location, TemplateService, template, mode) {
  $scope.template = template;
  $scope.mode = mode;

  if ($scope.mode === 'copy') {
    $scope.template.name = '';
  }

  $scope.titlePlaceholder = 'ex. Feature: {{title}}';

  (function(preload) {
    if (!preload || $scope.template) {
      return;
    }
    $scope.template = {
      name: 'template0',
      owner: 'kentcdodds',
      repo: 'issue-template',
      template: ['# Test Input: {{field0}}', '',
        '## Test Select: {{field1}}', '',
        'Test Radio: {{field2}}', '',
        'Test Checkbox: {{field3}}'].join('\n'),
      fields: [
        {
          name: 'Test Input',
          element: 'input',
          type: 'text',
          value: 'Pre loaded value'
        },
        {
          name: 'Test Select',
          element: 'select',
          type: 'empty',
          value: 'option1,option2,option3'
        },
        {
          name: 'Test Radio',
          element: 'input',
          type: 'radio',
          value: 'option1,option2,option3'
        },
        {
          name: 'Test Checkbox',
          element: 'input',
          type: 'checkbox',
          value: 'option1,option2,option3'
        }
      ]
    };
  })(false);

  $scope.deleteTemplate = function() {
    TemplateService.deleteTemplate($scope.template);
    $location.path('/');
  };

  $scope.copyTemplate = function() {
    $location.path('/new-template').search({
      copy: true,
      owner: $scope.template.owner,
      repo: $scope.template.repo,
      name: $scope.template.name
    });
  };

  $scope.removeField = function(index) {
    $scope.template.fields.splice(index, 1);
  };

  function getTemplateUrl() {
    var owner = $scope.template.owner;
    var project = $scope.template.repo;
    var name = $scope.template.name;
    return owner + '/' + project + '/' + name;
  }

  $scope.submitTemplate = function() {
    $scope.template.createdBy = $scope.user.login;
    TemplateService.saveTemplate(JSON.parse(angular.toJson($scope.template)));
    $scope.templateUrl = '#/' + getTemplateUrl();
  };

});