angular.module('app')
    .component('frontContent', {
        templateUrl: "components/front-page/front-page.html",
        controller: ['Product', function(Product) {
            var self = this;


            this.$onInit = function () {
                Product.getList().then(function (res) {
                    self.prod = Product;
                });
            };
        }]
    });