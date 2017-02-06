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
                firstname: self.user.firstname,
                lastname: self.user.lastname,
                state: self.user.state,
                phone: self.user.phone,
                email: self.user.email
            };
            self.orderMake.order = self.order;
            console.log(self.user.active);
            self.orderFun = function(){
                console.log(self.orderMake);
            }
        }]
    });
