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
                data: 'created.ask',
            };
            self.caret = '';
            self.findStocks = false;
            self.price = {
                min: 0,
                max: 99999
            }
            var typeCashe = '';
            this.$onInit = function () {
                this.orderBy();
            }
            this.orderBy = function () {
                if (typeCashe !== self.order.data) self.orders = {};
                typeCashe = self.order.data;

                if(self.order.data == 'price.ask' || self.order.data == 'price.desc'){
                    self.order.data == 'price.ask'?self.orders['price'] = 'ask':self.orders['price'] = 'desc';
                }else{
                    self.order.data == 'created.ask'?self.orders['created'] = 'ask':self.orders['created'] = 'desc';
                }
                self.caret = self.orders[Object.keys(self.orders)[0]];
                var category = $location.$$path.split('/').pop();
                console.log(category)
                var criteria = {};
                if (category !== '') criteria['category'] = category;
                criteria.sort = self.order.data;
                self.findStocks?criteria.group = 'stocks':criteria.group = '';
                console.log('price=' + self.price.min + '&price=' +  self.price.max);
                console.log(criteria.group);
                criteria.price =  [self.price.min, self.price.max];
                criteria.skip = 0;
                Product.skip = 0;
                self.viewText = self.order.text;
                Product.getList(criteria);
            };

            function reversOrder () {
                order =  order == -1 ? 1 : -1;
            }
        }]
    });