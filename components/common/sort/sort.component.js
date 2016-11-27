angular.module('app')
    .component('sortProduct', {
        templateUrl: "components/common/sort/sort.html",
        controller: ['Product', function(Product) {
            var trend = 1;
            var orders = {
                price: trend,
                created: trend
            };
            this.orderBy = function (type) {
                var criteria = {};
                orders[type] = orders[type] == trend ? -1 : 1;
                criteria[type] = orders[type];
                criteria.skip = 0;
                Product.getList(criteria);
            };

            function reversOrder () {
                order =  order == -1 ? 1 : -1;
            }
        }]
    });