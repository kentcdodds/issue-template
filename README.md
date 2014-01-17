#Issue Template

A way for github projects to make templates for github issues.

##Implementation

I plan on a github page (currently will be at http://kent.doddsfamily.us/issue-template, but I may change it to something like http://issuetemplates.com or something). This will be simple and powered by `angular`, `angular-ui-router/bootstrap`, and `firebase`. You will be able create a new template at `/#/new-template` and then create a new issue at `/#/angular/angular.js/feature`/`/#/angular/angular.js/documentation`/`/#/angular/angular.js/whatever` where "angular" would be the project github handle, "angular.js" would be the project, and "whatever" would be the template.

###Creating new template

You'd have a few fields to work with here:
 - GitHub project (for example: "angular/angular.js")
 - Template Fields
   - name
   - element (like `input`, `textearea`, `select`, etc)
   - type (any sensible html5 input type)
   - value(s) (comma separated values for the element - for input:text this will be filled into the input box, for select or input:radio/checkbox, this will be the options to select)
 - Template - An angular template for how the issue will look when it's created.

When you create a new template, it will be persisted in firebase and then loaded when someone goes to `/#/:handle/:project/:template` the template is loaded. The user will be able to login with their github account and create an issue with the template you've created.

###Creating an issue

You will go to the issue-template url and sign in with your github account. You will then see the form which is based on the template. You'll have a label (field name) and the input field (element:type with value(s)). You'll fill in the fields, and click submit. You'll then see a link to the issue that was created.
