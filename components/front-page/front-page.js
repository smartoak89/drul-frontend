angular.module('app')
    .component('frontContent', {
        templateUrl: "components/front-page/front-page.html",
        controller: ['Product', 'Cart', function(Product, Cart) {
            var self = this;
            this.$onInit = function () {
                self.products = Product.getList();
            };
            self.cart = Cart;
            console.log(self.cart);
            self.cart.list();
            self.cart.listDef();
        }]
    });