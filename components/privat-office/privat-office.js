angular.module('app')
    .component('privatOffice', {
        templateUrl: "components/privat-office/privat-office.html",
        controller: ['Cart', 'User', function(Cart, User) {
            var self = this;
            self.user = User;
            self.cart = Cart;
            console.log(self.cart.cartList)
            self.countPlus = function(){
                self.counter++;
            };
            self.countMinus = function(){
                self.counter--;
            };

            this.cartList = Cart.list();

        }]
    });