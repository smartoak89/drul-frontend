angular.module('app')
    .component('frontContent', {
        templateUrl: "components/front-page/front-page.html",
        controller: ['Product', '$q', 'SortService', function(Product, $q, SortService) {
            var self = this;

            this.$onInit = function () {
                Product.getList();
            };
            self.Product = Product;
            this.showMore = function () {
                console.log('showMore');
                SortService.showMore();
            }
        }]
    });