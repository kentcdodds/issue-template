angular.module('it').filter('split', function() {
  return function(input, delimiter) {
    delimiter = delimiter || ',';
    return typeof input === 'string ' ? input.split(delimiter) : input;
  };
});