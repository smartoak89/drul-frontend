angular.module('app')
    .component('product', {
        templateUrl: "components/common/product.html",
        bindings: {
            product: '='
        },
        controller: ['Cart', 'User','Product','Conf', 'DeferredService', function(Cart, User, Product, Conf, DeferredService) {

            var self = this;
            this.cart = Cart;
            this.class = 'wrapB';
            this.class3 = 'wrapB';
            this.class1 = 's-2';
            this.class2 = 's-3';
            self.user = User.get();
            self.Conf = Conf;
            this.addToCart = function () {

            };

            self.addToDeferred = function () {
                DeferredService.add(self.product, function () {});
            };

            self.delFromDeferred = function () {
                DeferredService.remove(self.product, function () {})
            };
        }]
    });