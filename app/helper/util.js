angular.module('it').constant('util', (function() {

  return {
    getDataSnapshot: function($q, service, serviceFn, fnArgs) {
      if (!angular.isArray(fnArgs)) {
        fnArgs = [fnArgs];
      }
      var deferred = $q.defer();
      serviceFn.apply(service, fnArgs).once('value', function(snapshot) {
        deferred.resolve(snapshot.val());
      });
      return deferred.promise;
    },
    simpleCompile: function(string, obj, regex, propToPull) {
      return string.replace(regex || /{{(.*?)}}/g, function(match, propName) {
        if (obj[propName]) {
          if (propToPull) {
            return obj[propName][propToPull];
          } else {
            return obj[propName];
          }
        } else {
          return match;
        }
      });
    }
  }
})());