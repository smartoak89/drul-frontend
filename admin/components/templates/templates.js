angular.module('admin')
    .component('templates', {
        templateUrl: "admin/components/templates/templates.html",
        controller: [function() {
            var self = this;
            self.templatesList = [{subject: 1, body: 11}, {subject: 2, body: 22}]
            this.$onInit = function () {

            }
        }]
    });