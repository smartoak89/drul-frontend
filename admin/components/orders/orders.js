angular.module('admin')
    .component('orders', {
        templateUrl: "admin/components/orders/orders.html",
        controller: ['RequestService', '$location', function(RequestService, $location) {
            var self = this;
            self.Math = window.Math;
            RequestService.list(function (err, list) {
                self.orderList = list;
                console.log(self.orderList);
            })

            self.removeOrder  = function(id, index){
                RequestService.indexOrder = index;
                RequestService.idOrder = id;
            }

            self.goToDetale = function (id, index) {
                RequestService.indexOrder = index;
                RequestService.idOrder = id;
                $location.path('/admin-panel/order/' + id);
            }

        }]
    });