angular.module('it').factory('TemplateService', function($firebase) {
  var templates = $firebase(new Firebase('https://issue-template.firebaseio.com/templates'));
  return {
    addTemplate: function(template) {
      var temp = templates.$child(template.owner).$child(template.repo).$child(template.name);
      temp.$set(template);
    },
    getTemplate: function(obj) {
      return templates.$child(obj.owner).$child(obj.repo).$child(obj.name);
    }
  }
});