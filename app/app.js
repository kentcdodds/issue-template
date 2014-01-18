(function() {
  var app = angular.module('it', ['ngRoute', 'firebase']);

  app.constant('Firebase', Firebase);

  app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: './app/home/home.html',
        controller: 'HomeCtrl'
      })
      .when('/new-template', {
        templateUrl: './app/templates/template.html',
        controller: 'NewTemplateCtrl'
      })
      .when('/search-projects', {
        templateUrl: './app/search/search-projects.html',
        controller: 'SearchProjectsCtrl'
      })
      .when('/:owner/:project', {
        templateUrl: './app/search/search-templates.html',
        controller: 'SearchTemplatesCtrl'
      })
      .when('/:owner/:repo/:name', {
        templateUrl: './app/new-issue/new-issue.html',
        controller: 'NewIssueCtrl',
        resolve: {
          fields: function($q, TemplateService, $route) {
            var deferred = $q.defer();
            var routeParams = $route.current.params;
            TemplateService.getTemplateFields({
              name: routeParams.name,
              owner: routeParams.owner,
              repo: routeParams.repo
            }).once('value', function(snapshot) {
                deferred.resolve(snapshot.val());
              });
            return deferred.promise;
          }
        }
      })
      .when('/:owner/:repo/:name/edit', {
        templateUrl: './app/templates/template.html',
        controller: 'EditTemplateCtrl'
      })
      .otherwise('/');
  });
})();