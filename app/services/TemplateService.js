angular.module('it').factory('TemplateService', function(Firebase) {
  var templates = new Firebase('https://issue-template.firebaseio.com/templates');
  return {
    addTemplate: function(template) {
      var temp = templates.child(template.owner).child(template.repo).child(template.name);
      temp.set(template);
    },
    getTemplateFields: function(obj) {
      return templates.child(obj.owner).child(obj.repo).child(obj.name).child('fields');
    }
  }
});