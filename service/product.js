angular.module('app')
    .factory('Product', ['Httpquery', '$http', '$cookies', '$q', 'Cart',
        function (Httpquery, $http, $cookies, $q, Cart) {
        function getCurrentCourse () {
            var url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
            return $http.get(url).then(function (res) {
                return res;
            });
        }
        return {
            products: null,
            stocksList: null,
            getList: function (criteria) {
                var self = this;
                var request = {params1: 'products'};

                for (var key in criteria) {
                    request[key] = criteria[key];
                }
                console.log('Request', request);

                var deffer = $q.defer();
                // if (this.products == null) {
                    Httpquery.query(request, function (res) {
                        // var currency = $cookies.get('currency');
                        // if (currency != 'UAH') {
                        //     self.changeCurrency(currency);
                        // }
                        angular.forEach(res, function (product) {
                            self.getGallery(product, function (err) {
                                if (err) console.trace('error', err);
                            })
                        });

                        self.products = res;
                        Cart.getCartAndDeferred(self.products);
                        deffer.resolve(self.products);
                    }, function (err) {
                        console.log(err);
                        deffer.reject(err);
                    })
                // }
                return deffer.promise;
                // return self.products;
            },
            listStocks: function () {
                var self = this;
                var deffer = $q.defer();
                if (self.stocksList == null) {
                    Httpquery.query({params1: 'stocks'}, function (res) {
                        deffer.resolve(res);
                        self.stocksList = res;
                    }, function (err) {
                        console.log(err);
                        deffer.reject(err);
                    })
                }
                return deffer.promise;
            },
            getAll: function(){
                var self = this;
                $q.all([Cart.listDef(), Cart.list(), self.getList()]).then(function(){
                    _.forEach(self.products, function(elem){
                        if(_.find(Cart.defList, {uuid: elem.uuid})){
                            elem.def = true;
                        }
                    });
                })
            },
            getGallery: function (product, callback) {
                var criteria = {
                    params1: 'files',
                    params2: product.uuid
                };
                Httpquery.query(criteria, function (res) {
                    product.photo = _.find(res, {type: 'main'});
                    product.gallery = res;
                    callback()
                }, function (err) {
                    callback(err);
                })
            },

            countStock: function (per, price){
                return Math.round(price-(price*per/100));
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