angular.module('app')
    .component('sortProduct', {
        templateUrl: "components/common/sort/sort.html",
        controller: ['Product', '$location', 'CurrencyService', function(Product, $location, CurrencyService) {
            var trend = 1;
            var self = this;
            self.currencyService = CurrencyService;
            self.orders = {};
            self.viewText = 'по дате';
            self.order = {
                text: 'по дате',
                data: 'created',
            };
            self.caret = '';
            self.findStocks = false;
            self.price = {
                min: '',
                max: ''
            }
            var typeCashe = '';
            this.orderBy = function () {
                if (typeCashe !== self.order.data) self.orders = {};
                typeCashe = self.order.data;

                if(self.order.data == 'price.ask' || self.order.data == 'price.desc'){
                    self.order.data == 'price.ask'?self.orders['price'] = 'ask':self.orders['price'] = 'desc';
                }else{
                    self.orders[self.order.data] = self.orders[self.order.data] == 'ask' ? 'desc' : 'ask';
                }
                self.caret = self.orders[Object.keys(self.orders)[0]];
                var category = $location.$$path.split('/').pop();
                var criteria = {};
                if (category !== '') criteria['category.slug'] = category;
                if(self.order.data == 'price.ask' || self.order.data == 'price.desc'){
                    criteria.sort = self.order.data;
                }else{
                    criteria.sort = self.order.data + '.' +self.orders[self.order.data];
                }
                self.findStocks?criteria.group = 'stocks':criteria.group = '';
                if(self.price.min&&self.price.max){

                }else{
                    self.price.min?criteria.price = 'min.2222':criteria.price = '';
                    self.price.max?criteria.price = 'min.1000max.2222':criteria.price = '';
                }
                criteria.skip = 0;
                Product.skip = 0;
                // criteria.skip = 0;
                self.viewText = self.order.text;
                Product.getList(criteria);
            };

            function reversOrder () {
                order =  order == -1 ? 1 : -1;
            }
        }]
    });