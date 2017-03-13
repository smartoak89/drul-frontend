angular.module('app')
    .service('CurrencyService', ['$http', '$cookies', function ($http, $cookies) {
        var self = this;
        var course = null;

        this.cy = $cookies.get('currency') || 'UAH';

        this.currency = function (value) {
            if (value) {
                self.cy = value;

                var now = new Date();
                var exp = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());

                return $cookies.put('currency', self.cy, {expires: exp});
            }

            return self.cy;
        };

        this.getCourses = function () {
            var url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

            if (course == null) {
                course = $http.get(url).then(function (res) {
                    return res.data;
                });
            }

            return course;
        };

        this.changePrice = function (product) {
            self.getCourses().then(function (res) {
                var cur = _.find(res, {ccy: self.cy});

                if (self.cy !== 'UAH') {
                    product.price = Math.round(product.price / cur.sale);
                    if(product.stock)
                        product.stock.old_price = Math.round(product.stock.old_price / cur.sale);
                }
            });

        }


    }]);

// return {
//     getCurrentCourse: function () {
//         var url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
//         return $http.get(url).then(function (res) {
//             return res;
//         });
//     },
//     refresh: function (products, currency) {
//         var self = this;
//         this.getCurrentCourse().then(function (cources) {
//             //TODO: change currency
//         });
//     }
// };
//
// function changePrice (curr) {
//     if (curr == undefined) {
//         return _.each(self.products, function (el, i) {
//             el.price = prod[i].price;
//             el.currency = 'UAH';
//         })
//     }
//     var currentPrice = curr.sale;
//
//     _.each(self.products, function (el, i) {
//         if (el.old_price) {
//             el.old_price =  (prod[i].old_price / currentPrice).toFixed(2);
//         }
//         el.price = (prod[i].price / currentPrice).toFixed(2);
//         el.currency = curr.ccy;
//     })