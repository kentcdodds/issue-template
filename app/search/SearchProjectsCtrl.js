angular.module('it').controller('SearchProjectsCtrl', function($scope, ProjectService) {
  var projectsObj = ProjectService.getProjects();
  $scope.projects = [];
  projectsObj.on('loaded', function() {
    var allProjects = projectsObj.projects.projects;
    for (var prop in allProjects) {
      if (allProjects.hasOwnProperty(prop)) {
        $scope.projects.push(allProjects[prop]);
      }
    }
  });
});