angular.module('app')
    .component('frontContent', {
        templateUrl: "components/front-page/front-page.html",
        controller: ['Product', '$q', 'SortService', 'Conf', function(Product, $q, SortService, Conf) {
            var self = this;
            self.Conf = Conf;
            self.Product = Product;

            this.$onInit = function () {
                Product.getList();
            };

            this.showMore = function () {
                Product.showMore();
            }
        }]

    });