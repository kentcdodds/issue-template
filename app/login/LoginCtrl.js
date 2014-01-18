angular.module('it').controller('LoginCtrl', function($scope, LoginService) {
  $scope.loginObj = LoginService.getLoginObj();
  $scope.login = function() {
    $scope.loginObj = LoginService.login();
  };
});