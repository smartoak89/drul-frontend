angular.module('app')
    .component('cartMain', {
        templateUrl: "components/cart-main/cart-main.html",
        controller: ['Cart', 'User', 'Product', '$timeout', '$anchorScroll', 'Conf', function(Cart, User, Product, $timeout, $anchorScroll, Conf) {
            var self = this;
            self.user = User.get();

            self.$onInit = function() {
                self.cartList = Cart.getList();
            };

            self.countPlus = function(i){
                self.cartList[i].counter++;
            };
            self.countMinus = function(i){
                    self.cartList[i].counter--;
                    self.checkMinus(i);
            };
            self.checkMinus = function(i){
                if(self.cartList[i].counter < 1) {
                    self.cartList[i].counter = 1;
                }

            };
            self.clickToMod = function () {
                $timeout(function() {
                    angular.element('#toMod').triggerHandler('click');
                });
            };
            self.makeOrder = function() {
                if (User.get() == null) {
                    self.clickToMod();
                } else {
                    $anchorScroll(0);
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