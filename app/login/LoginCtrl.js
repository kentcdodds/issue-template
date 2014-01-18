angular.module('it').controller('LoginCtrl', function($scope, LoginService) {
  $scope.login = LoginService.login;
  $scope.logout = LoginService.logout;
  $scope.user = LoginService.getUser();
  $scope.$on('userStateChange', function(event, user) {
    $scope.user = user;
  });
});