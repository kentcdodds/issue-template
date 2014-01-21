angular.module('it').controller('SearchTemplatesCtrl', function($scope, _, owners, TemplateService) {
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
  $scope.templates = templateArray;
});