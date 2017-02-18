angular.module('admin')
    .component('orders', {
        templateUrl: "admin/components/orders/orders.html",
        controller: ['RequestService', '$location', function(RequestService, $location) {
            var self = this;

            RequestService.list(function (err, list) {
                self.orderList = list;
            })

            self.goToDetale = function (id) {
                $location.path('/admin/order/' + id);
            }

        }]
    });