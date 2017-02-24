angular.module('app')
    .service('Cart', ['Httpquery', 'User', 'Currency', '$log', '$q', '$http', 'Conf', function (Httpquery, User, Currency, $log, $q, $http, Conf) {
        var cart = [];
        return {
            cartList: null,
            defList: null,
            addToCart: function (product) {
                if (!product.inCart) {
                    product.inCart = true;
                    cart.push(product);
                }
            },
            getCart: function () {
                return cart;
            },
            addToDeferred: function (product) {
                console.log(product);
                console.log(User);
                var self = this;
                $http({
                    url: Conf.api_path + '/deferred/' + User.active.uuid + '/' + product.uuid,
                    method: 'PUT'
                }).then(function (res) {
                    console.info('res', res);
                    self.defList.push(product);
                }, function(err) {
                    console.info('error', err);
                });
                // Httpquery.put({params1: 'deferred', params2: User.active.uuid, params3: product.uuid}, function (res) {
                //     console.log('Deferred res', res);
                //     if (!res.message){
                //         self.defList.push(product);
                //     }
                // }, function (err) {
                //     console.log('Deferred err', res);
                // })
            },
            delFromDeferred: function(product) {
                var self = this;
                Httpquery.delete({params1:'deferred', params2: User.active.uuid, params3: product.uuid}, function(res){
                    console.log(res);
                    _.remove(self.defList, {uuid: product.uuid});
                    // self.defList.splice(_.findIndex(self.defList, {uuid: product.uuid}),1);
                }, function(err){
                    console.log(err);
                });
            },
            delFromCart: function(product) {
                var self = this;
                Httpquery.delete({params1:'cart', params2: User.active.uuid, params3: product.uuid}, function(res){
                    console.log(res);
                    self.cartList.splice(_.findIndex(self.cartList, {uuid: product.uuid}),1);
                }, function(err){
                    console.log(err);
                });
            },
            clearCart: function () {
                var self = this;
                _.each(self.cartList, function (i) {
                    self.delFromCart(i);
                })
            },
            list: function () {
                var self = this;
                var defer = $q.defer();
                var user = User.checkUser();
                if (user) {
                    console.info('user defined', user);
                    if (self.cartList === null) {
                        //console.log(user.uuid);
                        Httpquery.query({params1: 'cart', params2: user.uuid}, function (res) {
                            //$log.info('response cartList ', res);
                            defer.resolve(res);
                            self.cartList = res;
                        }, function (err) {
                            console.log(err);
                            defer.reject(err);
                        })
                    }
                    return defer.promise;
                }
                //TODO: user is not active
            },
            listDef: function () {
                var self = this;
                var defer = $q.defer();
                var user = User.checkUser()
                if (user) {
                    if (self.defList === null) {
                        Httpquery.query({params1: 'deferred', params2: user.uuid}, function (res) {
                            //$log.info('response defList ', res);
                            defer.resolve(res);
                            self.defList = res;
                        }, function (err) {
                            console.log(err);
                            defer.reject(err);
                        });
                        return defer.promise;
                    }
                }
                //TODO: user is not active
            },
            save: function (product, data) {
                var self = this;
                //var userID = User.active.uuid;
                console.log('UserActive', User);

                $http({
                    url: Conf.api_path + '/cart/' + User.active.uuid + '/' + product.uuid,
                    method: 'PUT',
                    data: data
                }).then(function (res) {
                    console.info('res', res);
                    res.data.counter = 0;
                    self.cartList.push(res.data);
                }, function(err) {
                    console.info('error', err);
                });
                //Httpquery.put({params1: 'cart', params2: User.active.uuid, params3: product.uuid}, function (res) {
                //    console.log('successAddToCart', res);
                //        console.log(self.cartList);
                //        self.cartList.push(res);
                //}, function (err) {
                //    console.log('errAddToCart', err);
                //})
            },
            replace: function(product){
                var self =this;
                Httpquery.delete({params1:'deferred', params2: User.active.uuid, params3: product.uuid}, function(res){
                    console.log(res);
                    self.cartList.splice(_.findIndex(self.cartList, {uuid: product.uuid}),1);
                    Httpquery.put({params1: 'cart', params2: User.active.uuid, params3: product.uuid}, function (res) {
                        console.log('successAddToCart', res);
                        console.log(self.cartList);
                        self.cartList.push(res);
                    }, function (err) {
                        console.log('errAddToCart', err);
                    })
                }, function(err){
                    console.log(err);
                });
            },
            getCartAndDeferred: function (products) {
                var self = this;

                if (self.defList && self.cartList) {
                    return [find(), addGal()]
                }

                $q.all([self.listDef(), self.list()]).then(function(){
                    console.log('stop');
                    find();
                    addGal();
                });

                function find () {
                    _.forEach(products, function(elem){
                        if(_.find(self.defList, {uuid: elem.uuid})){
                            elem.def = true;
                        }
                })
                }
                function addGal () {
                    _.forEach(products, function(elem){
                        if(_.find(self.defList, {uuid: elem.uuid})){
                            self.defList[_.findIndex(self.defList, {uuid: elem.uuid})].gallery = elem.gallery;
                            self.defList[_.findIndex(self.defList, {uuid: elem.uuid})].photo = elem.photo;
                        }
                        if(_.find(self.cartList, {uuid: elem.uuid})){
                            self.cartList[_.findIndex(self.cartList, {uuid: elem.uuid})].gallery = elem.gallery;
                            self.cartList[_.findIndex(self.cartList, {uuid: elem.uuid})].photo = elem.photo;
                        }
                    });
                }
            }
        };
        // return {
        //     addToCart: function (product) {
        //         var storOrders = $cookies.get('order');
        //         if (!storOrders) {
        //             storOrders = ''
        //         }
        //         storOrders += '%S' + product.uuid;
        //         $cookies.put('order', storOrders);
        //     },
        //     getFromCart: function (callback) {
        //         var products = $cookies.get('order');
        //         var arrRes = [];
        //         if (products){
        //             products = parseOrderStor(products);
        //             _.each(getAllProducts(products), function(i) {
        //                 arrRes.push(i);
        //             });
        //             return arrRes;
        //         }
        //     }
        // };
        // function getAllProducts (uuidArr) {
        //     var promises = [];
        //     _.each(uuidArr, function (i) {
        //         promises.push(Httpquery.get({params1: 'product', params2: i}, function (res) {
        //             return res;
        //         }));
        //     });
        //     return promises;
        // }
        // function parseOrderStor (arr) {
        //     return arr.split('%S').slice(1)
        // }
    }]);