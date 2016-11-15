angular.module('app')
    .component('frontContent', {
        templateUrl: "components/front-page/front-page.html",
        controller: ['Product', 'Cart', function(Product, Cart) {
            var self = this;

            this.$onInit = function () {
                Cart.anyFunc();
                self.prod = Product;

            };

        }]
    });