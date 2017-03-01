angular.module('app')
    .component('cartMain', {
        templateUrl: "components/cart-main/cart-main.html",
        controller: ['Cart', 'User', 'Product', '$timeout', '$anchorScroll', 'Conf', function(Cart, User, Product, $timeout, $anchorScroll, Conf) {
            var self = this;
            self.user = User.get();
            self.cart = Cart;
            self.orderInfo = false;
            if(self.user == null){
                if(self.cart.cartList == null){
                    self.cart.cartList = [];
                }
            }

            self.$onInit = function() {
                if (self.cart.cartList == null){
                    self.cart.list().then(function(){
                        Product.getGallery(self.cart.cartList);
                        // Product.countStock(self.cart.cartList);
                        console.log('cartList', self.cart.cartList);
                    });
                }else{
                    Product.countStock(self.cart.cartList);
                    console.log(self.cart.cartList);
                }

            }

            self.countPlus = function(i){
                self.cart.cartList[i].counter++;
            };
            self.countMinus = function(i){
                    self.cart.cartList[i].counter--;
                    self.checkMinus(i);
            };
            self.checkMinus = function(i){
                if(self.cart.cartList[i].counter < 1) {
                    self.cart.cartList[i].counter = 1;
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