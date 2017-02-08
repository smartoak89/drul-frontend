angular.module('app')
    .component('privatOffice', {
        templateUrl: "components/privat-office/privat-office.html",
        controller: ['Cart', 'User', 'OrderService', function(Cart, User, OrderService) {
            var self = this;
            self.user = User;
            self.cart = Cart;

            this.$onInit = function () {
                self.OrderServ = OrderService;
                OrderService.getListHistoryOrders(function (err) {
                    console.error('err', err);
                })
            };

            self.countPlus = function(){
                self.counter++;
            };

            self.countMinus = function(){
                self.counter--;
            };

            this.cartList = Cart.list();

        }]
    });