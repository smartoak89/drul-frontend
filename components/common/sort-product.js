angular.module('app')
    .component('sortProduct', {
        templateUrl: "components/common/sort-product.html",
        controller: ['Httpquery', function(Httpquery) {
            var order= 'desc';
            var revers = {};
            var query = {
                params1:'products',
                params2: 'sort'
            };
            this.orderBy = function (criteria) {
                query[criteria] = order;
                reversOrder();
                Httpquery.query( query , function (res) {
                    console.info('order success ', res);
                }, function (err) {
                    console.error('order error ', err);
                });
                revers = !revers;
            };

            function reversOrder () {
                order =  order == 'desc' ? 'asc': 'desc'
            }
        }]
    });