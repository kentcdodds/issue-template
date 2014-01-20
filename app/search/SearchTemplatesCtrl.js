angular.module('it').controller('SearchTemplatesCtrl', function($scope, _, owners) {
  // flatten templates
  var templateArray = [];
  _.each(owners, function(repos, owner) {
    _.each(repos, function(templates, repo) {
      _.each(templates, function(template) {
        templateArray.push({
          owner: owner,
          repo: repo,
          name: template.name
        });
      })
    });
  });
  $scope.templates = templateArray;
});