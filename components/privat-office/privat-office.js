angular.module('app')
    .component('privatOffice', {
        templateUrl: "components/privat-office/privat-office.html",
        controller: ['Cart', 'User', 'OrderService', 'RequestService','$location', 'Conf', 'Product', 'DeferredService', 'FileService', function(Cart, User, OrderService, RequestService, $location, Conf, Product, DeferredService, FileService) {
            var self = this;
            self.user = User;
            self.cart = Cart;
            self.orders = [];
            self.Conf = Conf;

            this.$onInit = function () {

                DeferredService.list(function (res) {
                    _.each(res, function (product) { FileService.listGallery(product) });
                    self.deferredList = res;
                });

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