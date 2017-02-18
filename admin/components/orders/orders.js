angular.module('admin')
    .component('orders', {
        templateUrl: "admin/components/orders/orders.html",
        controller: ['RequestService', function(RequestService) {
            var self = this;

            RequestService.list(function (err, list) {
                self.orderList = list;
            })

        }]
    });