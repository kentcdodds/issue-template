angular.module('it').controller('EditTemplateCtrl', function($scope, template) {
  $scope.template = template;
  $scope.templateUrl = '';
  $scope.submitTemplate = function() {
    console.log('not yet supported');
  }
});