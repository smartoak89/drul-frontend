angular.module('admin')
    .component('templates', {
        templateUrl: "admin/components/templates/templates.html",
        controller: ['Templates', function(Templates) {
            var self = this;
            this.$onInit = function () {
                Templates.list(function(templatesList){
                    self.templatesList = templatesList;
                })
            }
        }]
    });