angular.module('app')
    .component('privatOffice', {
        templateUrl: "components/privat-office/privat-office.html",
        controller: ['Cart', 'User', 'OrderService', 'RequestService','$location', 'Conf', 'Product', 'DeferredService', 'FileService', 'MainService',
            function(Cart, User, OrderService, RequestService, $location, Conf, Product, DeferredService, FileService, MainService) {
                var self = this;
                self.user = User;
                self.cart = Cart;
                this.mainService = MainService;
                self.orders = [];
                self.Conf = Conf;

                this.$onInit = function () {

                    DeferredService.list(function (res) {
                        console.log('res deferred', res);
                        _.each(res, function (product) { FileService.mainPhoto(product) });
                        self.deferredList = res;
                    });

                    OrderService.getListHistoryOrders(function (err, res) {
                        console.log('orders', res);
                        _.each(res, function (order) {
                            RequestService.getOneOrder(order.uuid, function (err, res) {
                                console.log('one order', res);
                                self.orders.push(res);
                            })
                        })
                    })
                };

                this.removeDeferred = function (deferred) {
                    DeferredService.remove(deferred, function (err) {
                        if (err) return console.error(err);
                    });
                };

                self.goToProduct = function (product) {
                    $location.path('/product/' + product.uuid);
                };

        }]});