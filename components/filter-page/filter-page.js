angular.module('app')
    .component('filterPage', {
        templateUrl: "components/filter-page/filter-page.html",
        controller: ['Product', '$location', 'SortService', function(Product, $location, SortService) {
            var self = this;

            self.Product = Product;

            this.$onInit = function () {
                self.category = $location.$$path.split('/').pop();
                Product.getList({skip: 0}, self.category);
            };

            var skip = 0;
            this.showMore = function () {
                skip += 1;
                Product.getList({skip: skip});
            }
        }]
    });