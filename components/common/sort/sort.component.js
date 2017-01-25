angular.module('app')
    .component('sortProduct', {
        templateUrl: "components/common/sort/sort.html",
        controller: ['Product', '$location', function(Product, $location) {
            var trend = 1;

            var orders = {
                price: 'ask',
                created: 'ask',
                reviews: 'ask',
                popularity: 'ask'
            };

            this.orderBy = function (type) {
                var category = $location.$$path.split('/').pop();
                var criteria = {};
                if (category !== '/') criteria.category = category;
                orders[type] = orders[type] == 'ask' ? 'desc' : 'ask';
                criteria[type] = orders[type];
                criteria.skip = 0;
                Product.getList(criteria);
            };

            function reversOrder () {
                order =  order == -1 ? 1 : -1;
            }
        }]
    });