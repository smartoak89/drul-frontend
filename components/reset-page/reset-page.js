angular.module('app')
    .component('resetPage', {
        templateUrl: "components/reset-page/reset-page.html",
        controller: [function() {
            var self = this;
            self.var = false;
            self.$onInit = function () {
                console.log('reset')
            };
        }]
    });
