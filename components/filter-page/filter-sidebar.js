angular.module('app')
    .component('filterSidebar', {
        templateUrl: "components/filter-page/filter-sidebar.html",
        controller: ['Httpquery', 'Product', function(Httpquery, Product) {
            console.log('filter sidebar')
            var self = this;
            self.products = Product;
        }]
    });