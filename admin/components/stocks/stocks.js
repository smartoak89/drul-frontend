angular.module('admin')
    .component('stocks', {
        templateUrl: "admin/components/stocks/stocks.html",
        controller: [function() {
            var self = this;
            this.add = function () {
                if (isValid() === true) {

                }
            };

            function isValid () {

            }

        }]
    });