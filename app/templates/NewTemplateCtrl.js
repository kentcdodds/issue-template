angular.module('it').controller('NewTemplateCtrl', function($scope, TemplateService, ProjectService) {
  $scope.template = {
    name: '',
    owner: '',
    repo: '',
    template: '',
    fields: [
      {
        name: '',
        element: '',
        type: '',
        values: ''
      }
    ]
  };

  (function(preload) {
    if (!preload) {
      return;
    }
    $scope.template = {
      name: 'template0',
      owner: 'kentcdodds',
      repo: 'issue-template',
      template: ['Test Input: {{field0}}', '# ', '',
        'Test Select: {{field1}}', '## ', '',
        'Test Radio: {{field2}}', '',
        'Test Checkbox: {{field3}}'].join('\n'),
      fields: [
        {
          name: 'Test Input',
          element: 'input',
          type: 'text',
          values: 'Pre loaded value'
        },
        {
          name: 'Test Select',
          element: 'select',
          type: 'empty',
          values: 'option1,option2,option3'
        },
        {
          name: 'Test Radio',
          element: 'input',
          type: 'radio',
          values: 'option1,option2,option3'
        },
        {
          name: 'Test Checkbox',
          element: 'input',
          type: 'checkbox',
          values: 'option1,option2,option3'
        }
      ]
    };
  })(true);

  $scope.removeField = function(index) {
    $scope.template.fields.splice(index, 1);
  };

  function getTemplateUrl() {
    var owner = $scope.template.owner;
    var project = $scope.template.repo;
    var name = $scope.template.name;
    return '#/' + owner + '/' + project + '/' + name;
  }

  function getFields(fields) {
    var theFields = [];
    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      var values = '';
      if (field.values) {
        values = field.values.split(',');
      }

      theFields.push({
        name: field.name,
        element: field.element,
        type: field.type,
        values: values
      });
    }
    return theFields;
  }

  $scope.submitTemplate = function() {
    var template = {
      name: $scope.template.name,
      owner: $scope.template.owner,
      repo: $scope.template.repo,
      template: $scope.template.template,
      createdBy: $scope.user,
      fields: getFields($scope.template.fields)
    };
    TemplateService.addTemplate(template);
    $scope.templateUrl = getTemplateUrl();
  };

});