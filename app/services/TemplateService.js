angular.module('it').factory('TemplateService', function($q, Firebase) {
  var templates = new Firebase('https://issue-template.firebaseio.com/templates');
  var TemplateService = {
    saveTemplate: function(template) {
      var temp = templates.child(template.owner).child(template.repo).child(template.name);
      temp.set(template);
    },
    getTemplateFields: function(obj) {
      return TemplateService.getTemplate(obj).child('fields');
    },
    getTemplate: function(obj) {
      return templates.child(obj.owner).child(obj.repo).child(obj.name);
    },
    getAllTemplates: function() {
      return templates;
    },
    deleteTemplate: function(template) {
      var deferred = $q.defer();
      templates.child(template.owner).child(template.repo).child(template.name).remove(function(error) {
        if (error) {
          deferred.reject();
        } else {
          deferred.resolve();
        }
      });
      return deferred.promise;
    }
  };
  return TemplateService;
});