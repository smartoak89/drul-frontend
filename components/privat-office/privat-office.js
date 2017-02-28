angular.module('app')
    .component('privatOffice', {
        templateUrl: "components/privat-office/privat-office.html",
        controller: ['Cart', 'User', 'OrderService', 'RequestService','$location', 'Conf', 'Product', function(Cart, User, OrderService, RequestService, $location, Conf, Product) {
            var self = this;
            self.user = User;
            self.cart = Cart;
            self.orders = [];
            self.Conf = Conf;

            this.$onInit = function () {
                self.cart.listDef().then(function(){
                    Product.getGallery(self.cart.defList);
                    Product.countStock(self.cart.defList);
                    console.log(self.cart.defList);
                });
                self.OrderServ = OrderService;
                OrderService.getListHistoryOrders(function (err, res) {
                    _.each(res, function (order) {
                        RequestService.getOneOrder(order.uuid, function (err, res) {
                            self.orders.push(res);
                        })
                    })
                })
            };

            self.goToProduct = function (product) {
                $location.path('/product/' + product.uuid);
            };

        }]
    });