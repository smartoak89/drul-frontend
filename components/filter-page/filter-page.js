angular.module('app')
    .component('filterPage', {
        templateUrl: "components/filter-page/filter-page.html",
        controller: ['Product', '$location', 'SortService', function(Product, $location, SortService) {
            var self = this;

            self.Product = Product;

            this.$onInit = function () {
                self.category = $location.$$path.split('/').pop();
                Product.getList(null, self.category);
            };

            this.showMore = function () {
                Product.showMore();
            }
        }]
    });