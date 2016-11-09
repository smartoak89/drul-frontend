angular.module('app')
    .factory('Currency', ['$http', function ($http) {
        return {
            getCurrentCourse: function () {
                var url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
                return $http.get(url).then(function (res) {
                    return res;
                });
            },
            refresh: function (products, currency) {
                var self = this;
                this.getCurrentCourse().then(function (cources) {
                    //TODO: change currency
                });
            }
        };

        function changePrice (curr) {
            if (curr == undefined) {
                return _.each(self.products, function (el, i) {
                    el.price = prod[i].price;
                    el.currency = 'UAH';
                })
            }
            var currentPrice = curr.sale;

            _.each(self.products, function (el, i) {
                if (el.old_price) {
                    el.old_price =  (prod[i].old_price / currentPrice).toFixed(2);
                }
                el.price = (prod[i].price / currentPrice).toFixed(2);
                el.currency = curr.ccy;
            })
        }
    }]);