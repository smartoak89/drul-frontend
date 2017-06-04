angular.module('app')
    .component('product', {
        templateUrl: "components/common/product.html",
        bindings: {
            product: '='
        },
        controller: ['FileService', 'Cart', 'MainService','Product','Conf', 'DeferredService', 'CurrencyService',
            function(FileService, Cart, MainService, Product, Conf, DeferredService, CurrencyService) {

                var self = this;
                this.cart = Cart;
                this.mainService = MainService;
                this.currencyService = CurrencyService;
                this.Conf = Conf;
                this.productService = Product;

                this.addToDeferred = function () {
                    DeferredService.add(self.product, function () {});
                };

                this.delFromDeferred = function () {
                    DeferredService.remove(self.product, function () {})
                };

                this.addToCart = function () {
                    Cart.add(self.product, null, function () {});
                };

                FileService.mainPhoto(self.product);

                this.newProductMark = function () {
                    var today = Date.now();

                    var expires = new Date(self.product.created);
                        expires.setDate(expires.getDate() + 10);

                    return (today < expires.getTime()) ? true : false;
                }
        }]
    });