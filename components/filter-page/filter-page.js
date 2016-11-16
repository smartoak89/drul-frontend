angular.module('app')
    .component('filterPage', {
        templateUrl: "components/filter-page/filter-page.html",
        controller: ['Product', 'Cart', function(Product, Cart) {
            var self = this;
            this.$onInit = function () {
                Cart.anyFunc();
                self.prod = Product;

            };
            self.prod = Product;
        }]
    });