angular.module('it').factory('LoginService', function($firebase, $firebaseSimpleLogin) {
  var firebaseRef = new Firebase('https://issue-template.firebaseio.com');
  var loginObj = $firebaseSimpleLogin(firebaseRef);
  return {
    getLoginObj: function() {
      return loginObj;
    },
    login: function() {
      loginObj.$login('github', {
        scope: 'user,repo'
      });
      return loginObj;
    },
    getUser: function() {
      return loginObj.user;
    }
  }
});