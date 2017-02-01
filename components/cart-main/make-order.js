angular.module('app')
    .component('makeOrder', {
        templateUrl: "components/cart-main/make-order.html",
        bindings: {
            cost: '=',
            count: '='
        },
        controller: ['Cart', 'User', function(Cart, User) {
            var self = this;
            self.user = User;
            self.cart = Cart;
            console.log(self.count);

        }]
    });
