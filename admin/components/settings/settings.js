angular.module('admin')
    .component('settings', {
        templateUrl: "admin/components/settings/settings.html",
        controller: ['Conf', 'Goods', 'HttpResource', 'File', function(Conf, Goods, HttpResource, File) {
            var self = this;

            HttpResource.get({params1: 'settings'}, function (res) {
                self.settings = res;
            });

            self.saveSetting = function () {
                self.settings.monitoring = self.settings.monitoring || 0;

                HttpResource.put({params1: 'setting'}, self.settings, function (res) {
                    self.settings = res;
                    self.editMode = false;
                })
            }
        }]
    });