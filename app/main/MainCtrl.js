angular.module('it').controller('MainCtrl', function($scope, LoginService) {
  $scope.login = LoginService.login;
  $scope.logout = LoginService.logout;
  $scope.loading = true;
  $scope.$on('userStateChange', function(event, user) {
    $scope.user = user;
  });
  $scope.$on('loadingStateChange', function(event, state) {
    $scope.loading = state;
  });
});