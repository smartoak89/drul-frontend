angular.module('app')
    .component('product', {
        templateUrl: "components/common/product.html",
        bindings: {
            product: '='
        },
        controller: ['$cookies', 'Cart', 'User', function($cookies, Cart, User) {
            this.cart = Cart;
            this.product.currency = $cookies.get('currency');
            this.addToCart = function () {
                var self = this;
                if (User.checkUser()) {
                    return Cart.save(self.product.uuid);
                }
                Cart.addToCart(this.product);
            }
        }]
    });