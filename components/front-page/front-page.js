angular.module('app')
    .component('frontContent', {
        templateUrl: "components/front-page/front-page.html",
        controller: ['Product', '$q', 'SortService', function(Product, $q, SortService) {
            var self = this;
            self.Product = Product;

            this.$onInit = function () {
                Product.getList();
            };

            this.showMore = function () {
                Product.showMore();
            }
        }]

    });