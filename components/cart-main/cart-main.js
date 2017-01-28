angular.module('app')
    .component('cartMain', {
        templateUrl: "components/cart-main/success.html",
        controller: ['Cart', 'User', function(Cart, User) {
            var self = this;
            self.user = User;
            self.cart = Cart;
            console.log(self.cart)
            //self.countPlus = function(){
            //    self.counter++;
            //};
            //self.countMinus = function(){
            //    self.counter--;
            //};
            //
            //this.cartList = Cart.list();

        }]
    });