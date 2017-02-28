angular.module('app')
    .component('sortProduct', {
        templateUrl: "components/common/sort/sort.html",
        controller: ['Product', '$location', function(Product, $location) {
            var trend = 1;
            var self = this;


            self.orders = {};
            var typeCashe = '';
            this.orderBy = function (type) {
                if (typeCashe !== type) self.orders = {};
                typeCashe = type;

                self.orders[type] = self.orders[type] == 'ask' ? 'desc' : 'ask';

                var category = $location.$$path.split('/').pop();
                var criteria = {};
                if (category !== '') criteria['category.slug'] = category;
                criteria.sort = type + '.' + self.orders[type];
                criteria.skip = 0;
                Product.skip = 0;
                // criteria.skip = 0;
                Product.getList(criteria);
            };

            function reversOrder () {
                order =  order == -1 ? 1 : -1;
            }
        }]
    });