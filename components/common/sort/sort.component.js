angular.module('app')
    .component('sortProduct', {
        templateUrl: "components/common/sort/sort.html",
        controller: ['Product', '$location', 'CurrencyService', function(Product, $location, CurrencyService) {
            var trend = 1;
            var self = this;
            self.currencyService = CurrencyService;
            self.orders = {};
            self.order = 'по дате'
            self.caret = '';
            var typeCashe = '';
            this.orderBy = function (type) {
                if (typeCashe !== type) self.orders = {};
                typeCashe = type;

                if(type == 'price.ask' || type == 'price.desc'){
                    type == 'price.ask'?self.orders['price'] = 'ask':self.orders['price'] = 'desc';
                }else{
                    self.orders[type] = self.orders[type] == 'ask' ? 'desc' : 'ask';
                }
                self.caret = self.orders[Object.keys(self.orders)[0]];
                var category = $location.$$path.split('/').pop();
                var criteria = {};
                if (category !== '') criteria['category.slug'] = category;
                if(type == 'price.ask' || type == 'price.desc'){
                    criteria.sort = type;
                }else{
                    criteria.sort = type + '.' +self.orders[type];
                }
                criteria.skip = 0;
                Product.skip = 0;
                // criteria.skip = 0;
                Product.getList(criteria);
            };

            function reversOrder () {
                order =  order == -1 ? 1 : -1;
            }

            function blur(o){
                console.log('+')
                o = false;
            }


        }]
    });