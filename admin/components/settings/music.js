angular.module('admin')
    .component('music', {
        templateUrl: "admin/components/settings/music.html",
        controller: ['FileUploader', 'Conf', function(FileUploader, Conf) {
            var self = this;

        }]
    });