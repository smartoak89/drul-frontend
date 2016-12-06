angular.module('app')
    .factory('Product', ['Httpquery', '$http', '$cookies', '$q', 'Cart',
        function (Httpquery, $http, $cookies, $q, Cart) {

            var skip = 0;
            return {
                products: null,
                stocksList: null,
                curProd: null,
                getList: function (criteria) {
                    var self = this;
                    var request = {
                        params1: 'products',
                        skip: skip
                    };
                    if (criteria) {
                        for (var key in criteria) {
                            key == 'skip' ? skip = 0 : false;
                            request[key] = criteria[key];
                        }
                    }
                    console.log('Request', request);
                    var promise = $q(function (resolve, reject) {
                        Httpquery.query(request, function (res) {
                            resolve(res)
                        }, function (err) {
                            console.error('Get products response', err);
                            reject(err);
                        })
                    });

                    self.configurableProducts(promise, function (products) {
                        if (request.skip !== 0) return self.products = self.products.concat(products);
                        self.products = products;
                    });

                },
                configurableProducts: function (products, callback) {
                    var self = this;
                    products.then(function (res) {
                        Cart.getCartAndDeferred(res);
                        $q.all([self.getGallery(res), self.changeCurrency(res)]).then(function (result) {
                            console.log(result[1]);
                            callback(result[1]);
                        })
                    })
                },
                showMore: function () {
                    skip += 1;
                    this.getList();
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
                getAll: function () {
                    var self = this;
                    $q.all([Cart.listDef(), Cart.list(), self.getList()]).then(function () {
                        _.forEach(self.products, function (elem) {
                            if (_.find(Cart.defList, {uuid: elem.uuid})) {
                                elem.def = true;
                            }
                        });
                    })
                },
                getGallery: function (products) {
                    var promises = products.map(function (prod) {
                        return $q(function (resolve, reject) {
                            Httpquery.query({params1: 'files', params2: prod.uuid}, function (res) {
                                prod.photo = _.find(res, {type: 'main'});
                                prod.gallery = res;
                                resolve(prod);
                            }, function (err) {
                                reject(err);
                            });
                        })
                    });

                    return promises;
                },
                countStock: function (per, price) {
                    return Math.round(price - (price * per / 100));
                },
                changeCurrency: function (products) {
                    var currency = $cookies.get('currency') || 'UAH';
                    var url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
                    return $q(function (resolve, reject) {
                        if (currency === 'UAH') return resolve(products);

                        $http.get(url).then(function (res) {
                            var curr = _.find(res.data, {ccy: currency});
                            _.each(products, function (el) {
                                el.price = (el.price / curr.sale).toFixed(2);
                            });
                            resolve(products);
                        }, function (err) {
                            console.error('Error change currency', err);
                            reject(err);
                        });
                    })

                },
                getCurProd: function (id) {
                    var self = this;
                    var defer = $q.defer();
                    Httpquery.get({params1: 'product', params2: id}, function (res) {
                        Httpquery.query({params1: 'files', params2: res.uuid}, function (ress) {
                            res.photo = _.find(ress, {type: 'main'});
                            res.gallery = ress;
                        })
                        defer.resolve(res);
                        self.curProd = res;
                    }, function (err) {
                        console.log(err);
                        defer.reject(err);
                    });
                    return defer.promise;

                }
            }
        }]);

function getCurrentCourse() {
    var url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
    return $http.get(url).then(function (res) {
        return res;
    });
}