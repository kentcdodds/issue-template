angular.module('it').controller('EditTemplateCtrl', function($scope, TemplateService, $routeParams) {
  $scope.template = TemplateService.getTemplate({
    name: $routeParams.name,
    owner: $routeParams.owner,
    repo: $routeParams.repo
  });

  $scope.templateUrl = '';
});