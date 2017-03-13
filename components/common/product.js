angular.module('app')
    .component('product', {
        templateUrl: "components/common/product.html",
        bindings: {
            product: '='
        },
        controller: ['FileService', 'Cart', 'MainService','Product','Conf', 'DeferredService', function(FileService, Cart, MainService, Product, Conf, DeferredService) {

            var self = this;
            this.cart = Cart;
            self.mainService = MainService;
            self.Conf = Conf;

            self.addToDeferred = function () {
                DeferredService.add(self.product, function () {});
            };

            self.delFromDeferred = function () {
                DeferredService.remove(self.product, function () {})
            };

            FileService.mainPhoto(self.product);
        }]
    });