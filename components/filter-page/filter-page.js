angular.module('app')
    .component('filterPage', {
        templateUrl: "components/filter-page/filter-page.html",
        controller: ['Product', '$location', 'SortService', function(Product, $location, SortService) {
            var self = this;
            // this.$onInit = function () {
            //     var slug = $location.$$path.split('/').pop();
            //     Product.getList({category: slug}).then(function (res) {
            //         self.prod = Product;
            //     });
            //
            // };
            // self.prod = Product;

            this.showMore = function () {
                SortService.showMore();
            }
        }]
    });