angular.module('app')
    .factory('Product', ['Httpquery', '$http', '$cookies', '$q', 'Cart', 'User','$location', 'queryParams', 'ReviewsService', 'FileService',
        function (Httpquery, $http, $cookies, $q, Cart, User, $location, queryParams, ReviewsService, FileService) {
            var queryStr = {
                params1: 'products'
            };
            return {
                products: [],
                stocksList: null,
                curProd: null,
                skip:0,
                getList: function (criteria, category) {
                    var self = this;

                    if (!criteria) queryStr = { params1: 'products' };

                    if (category) {
                        queryStr.params2 = 'category';
                        queryStr.params3 = category;
                    }

                    criteria = criteria || {sort: 'created.desk'};

                    for (var key in criteria) {
                        queryStr[key] = criteria[key];
                    }

                   if (queryStr.skip == 0) delete queryStr.skip;

                    var promise = $q(function (resolve, reject) {
                        Httpquery.query(queryStr, function (res) {
                            console.log('res', res);
                            resolve(res)
                        }, function (err) {
                            console.error('Get products response', err);
                            reject(err);
                        })
                    });

                    self.configurableProducts(promise, function (products) {
                        if (self.skip == 0) self.products = [];
                        self.products = self.products.concat(products);
                    });

                },
                showMore: function () {
                    this.skip += 1;
                    this.getList({skip: this.skip});
                },
                configurableProducts: function (products, callback) {
                    var self = this;
                    products.then(function (res) {
                        Cart.getCartAndDeferred(res);
                        $q.all([self.getGallery(res), self.changeCurrency(res)]).then(function (result) {
                            self.countStock(result[1]).then(function(result2){
                                _.forEach(result2, function (elem) {
                                   // self.getCom(elem);
                                });
                                if(self.curProd){
                                    var curren = _.find(result2, {uuid: self.curProd.uuid});
                                    console.log(curren);
                                    self.curProd.price = curren.price;
                                    self.curProd.stockCost = curren.stockCost;
                                }
                                callback(result2);
                            })

                        })
                    })
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
                saveCom: function(com, prod, user){
                    Httpquery.save({params1:'reviews', params2:prod.uuid, params3: user.uuid}, com, function(res){
                        console.log(res);
                    }, function(err){
                        console.log(err);
                    })
                },
                getAll: function () {
                    var self = this;
                    $q.all([Cart.listDef(), Cart.list(), self.getList()]).then(function () {
                        _.forEach(self.products, function (elem) {
                            if (_.find(Cart.defList, {uuid: elem.uuid})) {
                                elem.def = true;
                            }
                            Httpquery.query({params1: 'reviews', params2:elem.uuid}, function(resss){
                                elem.comments = resss;
                            });
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
                countStock: function (products) {
                    var self = this;
                    return $q(function(resolve){
                    if (self.stocksList == null) {
                        self.listStocks().then(function () {
                            if(!Array.isArray(products)){
                                var stock = _.find(self.stocksList, {uuid: products.stock});
                                if (stock) {
                                    products.oldPrice = angular.copy(products.price);
                                    products.price = Math.round(products.oldPrice - ( products.oldPrice * stock.percent / 100 ));
                                } else products.stockCost = null
                            }else {
                                _.each(products, function (el) {
                                    var stock = _.find(self.stocksList, {uuid: el.stock});
                                    if (stock) {
                                        el.oldPrice = angular.copy(el.price);
                                        el.price = Math.round(el.oldPrice - ( el.oldPrice * stock.percent / 100 ));
                                    } else el.oldPrice = null
                                });
                            }
                            resolve(products);
                        })
                    } else {
                        if(!Array.isArray(products)){
                            var stock = _.find(self.stocksList, {uuid: products.stock});
                            if (stock) {
                                products.stockCost = Math.round(products.price - ( products.price * stock.percent / 100 ));
                            } else products.stockCost = null
                        }else {
                            _.each(products, function (el) {
                                var stock = _.find(self.stocksList, {uuid: el.stock});
                                if (stock) {
                                    el.stockCost = Math.round(el.price - ( el.price * stock.percent / 100 ));
                                } else el.stockCost = null
                            });
                        }
                        resolve(products);
                    }})
                },
                changeCurrency: function (products) {
                    var self = this;
                    var currency = $cookies.get('currency') || 'UAH';
                    var url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
                    return $q(function (resolve, reject) {
                        if (currency === 'UAH') return resolve(products);

                        $http.get(url).then(function (res) {
                            var curr = _.find(res.data, {ccy: currency});
                            _.each(products, function (el) {
                                el.price = Math.round(el.price / curr.sale);
                                //.toFixed(2)
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
                        });
                        self.getCom(res);
                        self.countStock(res).then(function(result){
                            //console.log(result)
                            defer.resolve(result);
                            self.curProd = result;
                        })

                    }, function (err) {
                        console.log(err);
                        defer.reject(err);
                    });
                    return defer.promise;

                },
                getProduct: function (id, callback) {
                    Httpquery.get({params1: 'product', params2: id}, function (res) {
                        ReviewsService.list(res);
                        FileService.listGallery(res);
                        callback(res);
                    }, function (err) {
                        console.error('Can\'t get one product =>', err);
                    });
                }
            }
        }]);

function getCurrentCourse() {
    var url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
    return $http.get(url).then(function (res) {
        return res;
    });
}