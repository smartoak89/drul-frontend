angular.module('admin')
    .component('orderDetale', {
        templateUrl: "admin/components/orders/order-detale.html",
        controller: ['RequestService', '$location', function(RequestService, $location) {
            var self = this;
            var orderID = $location.$$path.split('/').pop();

            self.editUserInfo = false;
            self.editOrderInfo = false;


            RequestService.getOneOrder(orderID, function (err, res) {
                self.order = res;
                self.newInfo = self.order;
            })

            self.saveChanges = function(){
                console.log(self.newInfo);
            }
        }]
    });