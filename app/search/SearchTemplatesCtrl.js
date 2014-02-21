angular.module('it').controller('SearchTemplatesCtrl', function($scope, _, owners, TemplateService, LoadingService, $routeParams) {
  // flatten templates
  var templateArray = [];
  _.each(owners, function(repos, owner) {
    _.each(repos, function(templates, repo) {
      _.each(templates, function(template) {
        templateArray.push({
          owner: TemplateService.cleanInboundReference(owner),
          repo: TemplateService.cleanInboundReference(repo),
          name: TemplateService.cleanInboundReference(template.name)
        });
      })
    });
  });
  $scope.owners = owners;
  $scope.templates = templateArray;
  $scope.owner = $routeParams.owner;
  $scope.repo = $routeParams.repo;
  LoadingService.loadingState(false);
});