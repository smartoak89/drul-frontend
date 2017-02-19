angular.module('app')
    .component('privatOffice', {
        templateUrl: "components/privat-office/privat-office.html",
        controller: ['Cart', 'User', 'OrderService', 'RequestService','$location', function(Cart, User, OrderService, RequestService, $location) {
            var self = this;
            self.user = User;
            self.cart = Cart;
            self.orders = [];
            this.$onInit = function () {
                self.OrderServ = OrderService;
                OrderService.getListHistoryOrders(function (err, res) {
                    _.each(res, function (order) {
                        RequestService.getOneOrder(order.uuid, function (err, res) {
                            self.orders.push(res);
                        })
                    })
                })
            };

            self.countPlus = function(){
                self.counter++;
            };

            self.countMinus = function(){
                self.counter--;
            };
            self.goToProduct = function (product) {
                $location.path('/product/' + product.uuid);
            };
            this.cartList = Cart.list();

        }]
    });