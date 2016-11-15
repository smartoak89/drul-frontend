angular.module('app')
    .factory('Product', ['Httpquery', '$http', '$cookies', '$q', function (Httpquery, $http, $cookies, $q) {
        function getCurrentCourse () {
            var url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
            return $http.get(url).then(function (res) {
                return res;
            });
        }
        return {
            products: null,
            getList: function () {
                var self = this;
                var deffer = $q.defer();
                if (this.products == null) {
                    Httpquery.query({params1: 'products'}, function (res) {
                        // var currency = $cookies.get('currency');
                        // if (currency != 'UAH') {
                        //     self.changeCurrency(currency);
                        // }
                        deffer.resolve(res);
                        self.products = res;
                    }, function (err) {
                        console.log(err);
                        deffer.reject(err);
                    })
                }
                return deffer.promise;
                // return self.products;
            },
            changeCurrency: function (newC) {
                var self = this;
                var prod;
                Httpquery.query({params1: 'products'}, function (res) {
                    prod = res;
                    getCurrentCourse().then(function (res) {
                        changePrice (_.find(res.data, {ccy: newC}));
                    });
                });

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
            }
        }
    }]);