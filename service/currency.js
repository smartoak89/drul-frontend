angular.module('app')
    .service('CurrencyService', ['$http', '$cookies', function ($http, $cookies) {
        var self = this;
        var course = null;
        var usd, rur, uah;

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
                    usd = _.find(res.data, {ccy: 'USD'});
                    rur = _.find(res.data, {ccy: 'RUR'});
                    console.log('course', res);
                    return res.data;
                });
            }

            return course;
        };

        this.changePrice = function (product) {
            self.getCourses().then(function (res) {
                var cur = _.find(res, {ccy: self.cy});

                if (self.cy !== 'UAH') {
                    product.price = (product.price / cur.sale).toFixed(2);
                    if(product.stock)
                        product.stock.old_price = (product.stock.old_price / cur.sale).toFixed(2);
                }
            });

        };

        this.getCy = function (cy) {
            switch(cy){
                case 'rur':
                    return Number(rur.sale);
                    break;
                case 'usd':
                    return Number(usd.sale);
                    break;
            }
        }

        // this.calculatePrice = function (currency, price, callback) {
        //     currency = currency || null;
        //
        //     self.getCourses().then(function (res) {
        //         var cur = _.find(res, {ccy: self.cy});
        //
        //         if (currency && currency != 'UAH') {
        //
        //             price.min = Math.round(price.min * cur.sale);
        //             price.max = Math.round(price.max * cur.sale) + 9;
        //
        //             return callback(price);
        //         }
        //
        //         if (!currency && self.cy !== 'UAH') {
        //             price = Math.round(price / cur.sale);
        //
        //         }
        //
        //         return callback(price);
        //     });
        // }


    }]);
