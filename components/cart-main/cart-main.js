angular.module('app')
    .component('cartMain', {
        templateUrl: "components/cart-main/cart-main.html",
        controller: ['Cart', 'User', 'Product', '$timeout', function(Cart, User, Product, $timeout) {
            var self = this;
            self.user = User;
            self.cart = Cart;
            self.orderInfo = false;
            if(self.user.active == null){
                if(self.cart.cartList == null){
                    self.cart.cartList = [];
                }
                for(var i =0; i<self.cart.cartList.length; i++){
                    self.cart.cartList[i].counter = 1;
                    console.log('-');
                    console.log(self.cart.cartList[i]);
                }
            }else {
                self.cart.list().then(function () {
                    for (var i = 0; i < self.cart.cartList.length; i++) {
                        console.log('+');
                        self.cart.cartList[i].counter = 1;
                    }

                });
            }
            self.countPlus = function(i){
                self.cart.cartList[i].counter++;
            };
            self.countMinus = function(i){
                    self.cart.cartList[i].counter--;
                    self.checkMinus(i);
            };
            self.checkMinus = function(i){
                if(self.cart.cartList[i].counter<0) {
                    self.cart.cartList[i].counter = 0;
                }
            };
            self.clickToMod = function () {
                $timeout(function() {
                    angular.element('#toMod').triggerHandler('click');
                });
            };
            self.makeOrder = function() {
                if (self.user.active == null) {
                    self.clickToMod();
                } else {
                    self.orderInfo = true;
                    self.count = 0;
                    self.cost = 0;
                    for (var i = 0; i < self.cart.cartList.length; i++) {
                        self.count = self.count + self.cart.cartList[i].counter;
                        self.cost = self.cost + self.cart.cartList[i].price * self.cart.cartList[i].counter;
                    }
                }
            }
        }]
    });