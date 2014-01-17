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
      .when('/new-issue', {
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

  app.controller('LoginCtrl', function($scope, LoginService) {
    $scope.loginObj = LoginService.getLoginObj();
    $scope.login = function() {
      $scope.loginObj = LoginService.login();
    };

  });

  app.controller('HomeCtrl', function($scope) {

  });

  app.controller('NewTemplateCtrl', function($scope) {

  });

  app.controller('NewIssueCtrl', function($scope, $routeParams, $http, LoginService) {
//    var templateRef = new Firebase('https://issue-template.firebaseio.com/' + $location.path());
    $scope.submitIssue = function() {
      $http({
        method: 'POST',
        url: 'https://api.github.com/repos/' + $routeParams.owner + '/' + $routeParams.repo + '/issues',
        params: {
          access_token: LoginService.getUser().accessToken
        },
        data: {
          title: 'This is a test',
          body: 'Did it work?'
        }
      }).success(function() {
          console.log('success!');
        });
    }
  });

  app.controller('SearchProjectsCtrl', function($scope) {
    // How to get simply the names of all children rather than all the data?
  });

  app.controller('SearchTemplatesCtrl', function($scope) {

  });
})();