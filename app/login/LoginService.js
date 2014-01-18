angular.module('it').factory('LoginService', function(Firebase, $firebaseSimpleLogin, $rootScope) {
  var firebaseRef = new Firebase('https://issue-template.firebaseio.com');
  var loginObj = $firebaseSimpleLogin(firebaseRef);
  $rootScope.$watch(function() {
    return loginObj.user;
  }, function(user) {
    broadcastStateChange(user);
  });

  function broadcastStateChange(user) {
    $rootScope.$broadcast('userStateChange', user);
  }

  return {
    logout: function() {
      loginObj.$logout();
      broadcastStateChange();
    },
    login: function() {
      loginObj.$login('github', {
        scope: 'user,repo'
      }).then(function(user) {
          // The watch will broadcast this.
        }, function(error) {
          console.error('Login failed: ', error);
          //TODO Handle this.
        });
    },
    getUser: function() {
      return loginObj.user;
    }
  }
});