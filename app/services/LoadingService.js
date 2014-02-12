angular.module('it').factory('LoadingService', function($rootScope) {
  var loadingState = true;

  function broadcastStateChange(loadingState) {
    $rootScope.$broadcast('loadingStateChange', loadingState);
  }

  return {
    loadingState: function(state) {
      if (typeof state !== 'undefined') {
        loadingState = state;
        broadcastStateChange(loadingState);
      }
      return state;
    }
  }
});