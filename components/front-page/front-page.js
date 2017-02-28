angular.module('app')
    .component('frontContent', {
        templateUrl: "components/front-page/front-page.html",
        controller: ['Product', '$q', 'SortService', 'Conf', function(Product, $q, SortService, Conf) {
            var self = this;
            self.Conf = Conf;
            self.Product = Product;

            this.$onInit = function () {
                Product.skip = 0;
                Product.getList({skip: 0});
            };

            // var skip = 0;
            // this.showMore = function () {
            //     skip += 1;
            //     Product.getList({skip: skip});
            // }
        }]

    });