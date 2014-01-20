angular.module('it').controller('MainCtrl', function($scope, LoginService) {
  $scope.login = LoginService.login;
  $scope.logout = LoginService.logout;
  $scope.$on('userStateChange', function(event, user) {
    $scope.user = user;
  });
});