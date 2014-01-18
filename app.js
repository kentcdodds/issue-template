(function() {
  var app = angular.module('it', ['ngRoute', 'firebase']);

  app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.html',
        controller: 'HomeCtrl'
      })
      .when('/new-template', {
        templateUrl: 'new-template.html',
        controller: 'NewTemplateCtrl'
      })
      .when('/search-projects', {
        templateUrl: 'search-projects.html',
        controller: 'SearchProjectsCtrl'
      })
      .when('/:owner/:project', {
        templateUrl: 'search-templates.html',
        controller: 'SearchTemplatesCtrl'
      })
      .when('/:owner/:repo/:template', {
        templateUrl: 'new-issue.html',
        controller: 'NewIssueCtrl'
      })
      .otherwise('/')
    ;
  });

  app.factory('LoginService', function($firebase, $firebaseSimpleLogin) {
    var firebaseRef = new Firebase('https://issue-template.firebaseio.com');
    var loginObj = $firebaseSimpleLogin(firebaseRef);
    return {
      getLoginObj: function() {
        return loginObj;
      },
      login: function() {
        loginObj.$login('github', {
          scope: 'user,repo'
        });
        return loginObj;
      },
      getUser: function() {
        return loginObj.user;
      }
    }
  });

  app.factory('TemplateService', function($firebase) {
    var templates = $firebase(new Firebase('https://issue-template.firebaseio.com/templates'));
    return {
      addTemplate: function(template) {
        var temp = templates.$child(template.owner).$child(template.repo).$child(template.name);
        temp.$set(template);
      }
    }
  });

  app.controller('LoginCtrl', function($scope, LoginService) {
    $scope.loginObj = LoginService.getLoginObj();
    $scope.login = function() {
      $scope.loginObj = LoginService.login();
    };
  });

  app.controller('HomeCtrl', function($scope) {

  });

  app.controller('NewTemplateCtrl', function($scope, TemplateService) {
    $scope.template = {
      name: 'template0',
      owner: 'kentcdodds',
      repo: 'issue-template',
      template: ['Test Input: {{field0}}', '==', '',
        'Test Select: {{field1}}', '--', '',
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

    function getTemplateUrl() {
      var owner = $scope.template.owner;
      var project = $scope.template.repo;
      var name = $scope.template.name;
      return '#/' + owner + '/' + project + '/' + name;
    }

    $scope.submitTemplate = function() {
      TemplateService.addTemplate({
        name: $scope.template.name,
        owner: $scope.template.owner,
        repo: $scope.template.repo,
        template: $scope.template.template,
        fields: (function() {
          var fields = [];
          for (var i = 0; i < $scope.template.fields.length; i++) {
            var field = $scope.template.fields[i];
            var values = '';
            if (field.values) {
              values = field.values.split(',');
            }

            fields.push({
              name: field.name,
              element: field.element,
              type: field.type,
              values: values
            });
          }
          return fields;
        })()
      });
      $scope.templateUrl = getTemplateUrl();
      console.log($scope.templateUrl);
    };

  });

  app.controller('NewIssueCtrl', function($scope, $firebase, $http, $location, LoginService, $compile) {
    var url = 'https://issue-template.firebaseio.com/templates' + $location.path();
    console.log(url);
    $scope.template = $firebase(new Firebase(url));
    $scope.issue = {
      title: 'This is a title',
      comments: 'This is a comment',
      fields: []
    };

    var tempWatch = $scope.$watch('template.fields', function(newVal) {
      if (newVal) {
        $scope.issue.fields = angular.copy(newVal);
        tempWatch();
      }
    });

    console.log($scope.template);

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
      }).success(function() {
          console.log('success!');
        });
    };
  });

  app.controller('SearchProjectsCtrl', function($scope) {
    // How to get simply the names of all children rather than all the data?
  });

  app.controller('SearchTemplatesCtrl', function($scope) {

  });
})();