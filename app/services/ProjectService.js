angular.module('it').factory('ProjectService', function(Firebase) {
  var ref = new Firebase('https://issue-template.firebaseio.com/projects');
  return {
    getProjects: function() {
      return ref;
    },
    addProjectTemplate: function(template) {
      ref.child('projects').push({
        name: template.name,
        owner: template.owner,
        repo: template.repo
      });
    }
  }
});