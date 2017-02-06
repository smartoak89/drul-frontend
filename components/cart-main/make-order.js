angular.module('app')
    .component('makeOrder', {
        templateUrl: "components/cart-main/make-order.html",
        bindings: {
            cost: '=',
            count: '=',
            order: '='
        },
        controller: ['Cart', 'User', function(Cart, User) {
            var self = this;
            self.user = User;
            self.cart = Cart;

            self.orderMake = {
                firstname: self.user.active.firstname,
                lastname: self.user.active.lastname,
                state: self.user.active.state,
                phone: self.user.active.phone,
                email: self.user.active.email
            };
            self.orderMake.order = self.order;
            self.orderFun = function(){
                console.log(self.orderMake);
            }
        }]
    });
