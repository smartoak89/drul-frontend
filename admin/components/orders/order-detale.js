angular.module('admin')
    .component('orderDetale', {
        templateUrl: "admin/components/orders/order-detale.html",
        controller: ['RequestService', '$location', function(RequestService, $location) {
            var self = this;

            var orderID = $location.$$path.split('/').pop();

            RequestService.getOneOrder(orderID, function (err, res) {
                self.order = res;
            })
        }]
    });