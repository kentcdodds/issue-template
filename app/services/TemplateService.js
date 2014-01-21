angular.module('it').factory('TemplateService', function($q, Firebase, util, _) {
  var templates = new Firebase('https://issue-template.firebaseio.com/templates');

  function cleanOutboundReference(ref) {
    return util.simpleCompile(ref, {
      '.': '__period__',
      '$': '__dollar__',
      '[': '__left_braket__',
      ']': '__right_braket__',
      '#': '__hash__',
      '/': '__forward_slash__'
    }, /(.)/g);
  }

  function cleanInboundReference(ref) {
    return util.simpleCompile(ref, {
      'period': '.',
      'dollar': '$',
      'left_braket': '[',
      'right_braket': ']',
      'hash': '#',
      'forward_slash': '/'
    }, /__(.*)__/g);
  }

  var TemplateService = {
    saveTemplate: function(template) {
      var owner = cleanOutboundReference(template.owner);
      var repo = cleanOutboundReference(template.repo);
      var name = cleanOutboundReference(template.name);
      var temp = templates.child(owner).child(repo).child(name);
      temp.set(template);
    },
    getTemplateFields: function(obj) {
      return TemplateService.getTemplate(obj).child('fields');
    },
    getTemplate: function(obj) {
      var owner = cleanOutboundReference(obj.owner);
      var repo = cleanOutboundReference(obj.repo);
      var name = cleanOutboundReference(obj.name);
      return templates.child(owner).child(repo).child(name);
    },
    getAllTemplates: function() {
      return templates;
      /*
      var deferred = $q.defer();
      debugger;
      templates.once('value', function(owners) {
        console.log(owners.val());
        _.each(owners.val(), function(owner, ownerName) {
          if (typeof owner !== 'object') {
            return;
          }
          var cleanedOwnerName = cleanInboundReference(ownerName);
          if (cleanedOwnerName === ownerName) {
            return;
          }
          var tempOwner = owners[ownerName];
          delete owners[ownerName];
          owners[cleanedOwnerName] = tempOwner;
          _.each(owners[cleanedOwnerName], function(repo, repoName) {
            if (typeof repo !== 'object') {
              return;
            }
            var tempRepo = owner[repoName];
            delete owner[repoName];
            owner[cleanInboundReference(repoName)] = tempRepo;
            _.each(repo, function(template, templateName) {
              if (typeof template !== 'object') {
                return;
              }
              var tempTemplate = repo[templateName];
              delete repo[templateName];
              repo[cleanInboundReference(templateName)] = tempTemplate;
            });
          });
        });
        console.log('after', arguments);
        deferred.resolve();
      });
      return deferred.promise;
      */
    },
    deleteTemplate: function(template) {
      var deferred = $q.defer();
      var owner = cleanOutboundReference(template.owner);
      var repo = cleanOutboundReference(template.repo);
      var name = cleanOutboundReference(template.name);
      templates.child(owner).child(repo).child(name).remove(function(error) {
        if (error) {
          deferred.reject();
        } else {
          deferred.resolve();
        }
      });
      return deferred.promise;
    },
    cleanInboundReference: cleanInboundReference
  };
  return TemplateService;
});