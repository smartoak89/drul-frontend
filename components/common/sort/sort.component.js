angular.module('app')
    .component('sortProduct', {
        templateUrl: "components/common/sort/sort.html",
        controller: ['Product', function(Product) {
            var defOrd = 1;
            var orders = {
                price: defOrd,
                created: defOrd
            };
            this.orderBy = function (type) {
                var criteria = {};
                orders[type] = orders[type] == defOrd ? -1 : 1;
                criteria[type] = orders[type];
                console.log(criteria);

                Product.products
                // SortService.orderBy(criteria);
            };

            function reversOrder () {
                order =  order == -1 ? 1 : -1;
            }
        }]
    });