angular.module('app')
    .component('frontContent', {
        templateUrl: "components/front-page/front-page.html",
        controller: ['Product', 'Cart', function(Product, Cart) {
            var self = this;
            this.$onInit = function () {
                Product.getList().then(function (res) {
                    self.products = res;
                });
            };

        }]
    });