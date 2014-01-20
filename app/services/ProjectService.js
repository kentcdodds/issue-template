angular.module('it').factory('ProjectService', function(Firebase, $q) {
  var projects = new Firebase('https://issue-template.firebaseio.com/projects');
  return {
    getProjects: function() {
      var deferred = $q.defer();
      projects.once('value', function(snapshot) {
        var owners = snapshot.projects;
        for (var owner in owners) {
          if (owners.hasOwnProperty(owner)) {
            var repos = oweners[owner];
            for (var repo in repos) {
              if (repos.hasOwnProperty(repo)) {

              }
            }
          }
        }
      });
      return deferred.promise;
    },
    addProjectTemplate: function(template) {
      var temp = projects.child('projects').child(template.owner).child(template.repo).child(template.name);
      temp.set('name', template.name);
      temp.set('owner', template.owner);
      temp.set('repo', template.repo);
      temp.set('createdBy', template.createdBy);
    }
  }
});