angular.module('app')
    .component('filterPage', {
        templateUrl: "components/filter-page/filter-page.html",
        controller: ['Product', '$location', 'SortService', '$state', function(Product, $location, SortService, $state) {
            var self = this;
            var path = [];
            self.Product = Product;

            this.$onInit = function () {
                for(var key in $state.params) {
                    path.push($state.params[key]);
                }
                Product.getList({skip: 0}, path);
            };

            var skip = 0;
            this.showMore = function () {
                skip += 1;
                Product.getList({skip: skip});
            }
        }]
    });