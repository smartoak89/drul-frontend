angular.module('app')
    .component('sortProduct', {
        templateUrl: "components/common/sort/sort.html",
        controller: ['SortService', function(SortService) {
            var defOrd = 'desc';
            var orders = {
                price: defOrd,
                created: defOrd
            };
            this.orderBy = function (type) {
                var criteria = {};
                orders[type] = orders[type] == defOrd ? 'asc' : 'desc';
                criteria[type] = orders[type];
                console.log(criteria);
                SortService.orderBy(criteria);
            };

            function reversOrder () {
                order =  order == 'desc' ? 'asc': 'desc'
            }
        }]
    });