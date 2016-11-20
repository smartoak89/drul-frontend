angular.module('app')
    .component('filterPage', {
        templateUrl: "components/filter-page/filter-page.html",
        controller: ['Product', '$location', function(Product, $location) {
            var self = this;
            this.$onInit = function () {
                var slug = $location.$$path.split('/').pop();
                Product.getList({category: slug}).then(function (res) {
                    self.prod = Product;
                });

            };
            self.prod = Product;
        }]
    });