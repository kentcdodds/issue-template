angular.module('it').factory('ProjectService', function($firebase) {
  var ref = $firebase(new Firebase('https://issue-template.firebaseio.com/projects'));
  return {
    getProjects: function() {
      return ref;
    },
    addProjectTemplate: function(template) {
      ref.$child('projects').$child('projects').$add({
        name: template.name,
        owner: template.owner,
        repo: template.repo
      });
    }
  }
});