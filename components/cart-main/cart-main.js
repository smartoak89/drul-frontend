angular.module('app')
    .component('cartMain', {
        templateUrl: "components/cart-main/cart-main.html",
        controller: ['Cart', 'User', 'Product', function(Cart, User, Product) {
            var self = this;
            self.user = User;
            self.cart = Cart;
            self.cart.list().then(function(){
                for(var i =0; i<self.cart.cartList.length; i++){
                    self.cart.cartList[i].counter = 1;
                    console.log(self.cart.cartList[i]);
                }
            });

            self.$onInit = function() {
                //self.Product.getGallery(self.cartList);
                //console.log(self.cartList);
            }
            self.countPlus = function(i){
                self.cart.cartList[i].counter++;
            };
            self.countMinus = function(i){
                    self.cart.cartList[i].counter--;
            };
            self.checkMinus = function(i){
                if(self.cart.cartList[i].counter<0) {
                    self.cart.cartList[i].counter = 0;
                }
            };
            //
            //this.cartList = Cart.list();

        }]
    });