angular.module('app')
    .component('frontContent', {
        templateUrl: "components/front-page/front-page.html",
        controller: ['Product', '$q', function(Product, $q) {
            var self = this;


            this.$onInit = function () {
                $q.all([Product.getList(), Product.listStocks()]).then(function (res) {
                    self.prod = Product;
                    console.log(self.prod)
                });
            };
        }]
    });