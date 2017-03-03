angular.module('app')
    .service('Cart', ['$rootScope', 'Httpquery', 'User', 'Currency', '$log', '$q', '$http', 'Conf', '$timeout', function ($rootScope, Httpquery, User, Currency, $log, $q, $http, Conf, $timeout) {
        var cart = [];
        var cartList;
        return {
            cartList: null,
            defList: null,
            add: function (product, option, callback) {
                var user = User.get();

                var productToAdd = {
                    combo: option,
                    image: product.photo.uuid
                };

                if (user) {
                    Httpquery.put({params1: 'cart', params2: product.uuid}, productToAdd, function (res) {
                        cartList.push(res);

                        $rootScope.$broadcast('changeCart', cartList);

                        callback();
                    }, function (err) {
                        console.error('can\'t add to deferred', err);
                        callback(err);
                    })
                } else {

                    if (!cartList) cartList = [];
                    cartList.push(productToAdd);

                    $rootScope.$broadcast('changeCart', cartList);
                }

                console.info('added to cart', productToAdd);
            },
            list: function () {
                console.log('queryCart service')
                var user = User.get();

                if (user) {

                    Httpquery.query({params1: 'cart'}, function (res) {
                        $timeout(function () { $rootScope.$broadcast('changeCart', res); }, 50);

                        if (!cartList) return cartList = res;

                        cartList = cartList.concat(res);

                    }, function (err) {
                        console.error('can\'t get cart list', err);
                    });
                }
            },
            getList: function () {
                return cartList;
            },
            remove: function () {

            },



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
                    url: Conf.api_path + '/deferred/' + User.get().uuid + '/' + product.uuid,
                    method: 'PUT'
                }).then(function (res) {
                    console.info('res', res);
                    self.defList.push(product);
                    product.def = true;
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
                Httpquery.delete({params1:'deferred', params2: User.get().uuid, params3: product.uuid}, function(res){
                    console.log(res);
                    _.remove(self.defList, {uuid: product.uuid});
                    // self.defList.splice(_.findIndex(self.defList, {uuid: product.uuid}),1);
                    product.def = false;
                }, function(err){
                    console.log(err);
                });
            },
            delFromCart: function(product) {
                var self = this;
                Httpquery.delete({params1:'cart', params2: User.get().uuid, params3: product.uuid}, function(res){
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
            listDef: function () {
                var self = this;
                var defer = $q.defer();
                var user = User.get();
                if (user) {
                    // if (self.defList === null) {
                        Httpquery.query({params1: 'deferred', params2: user.uuid}, function (res) {
                            defer.resolve(res);
                            self.defList = res;
                        }, function (err) {
                            console.log(err);
                            defer.reject(err);
                        });
                        return defer.promise;
                    // }
                }
                //TODO: user is not active
            },
            save: function (product, data) {
                var self = this;
                //var userID = User.active.uuid;
                console.log('Data', data);

                $http({
                    url: Conf.api_path + '/cart/' + User.get().uuid + '/' + product.uuid,
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
            replace: function(product, data){
                var self =this;
                Httpquery.delete({params1:'deferred', params2: User.get().uuid, params3: product.uuid}, function(res){
                    console.log(res);
                    self.defList.splice(_.findIndex(self.defList, {uuid: product.uuid}),1);
                    $http({
                        url: Conf.api_path + '/cart/' + User.get().uuid + '/' + product.uuid,
                        method: 'PUT',
                        data: data
                    }).then(function (res) {
                        console.info('res', res);
                        res.data.counter = 0;
                        self.cartList.push(res.data);
                    }, function(err) {
                        console.info('error', err);
                    });
                }, function(err){
                    console.log(err);
                });
            },
            getCartAndDeferred: function (products) {
                var self = this;

                if (self.defList && self.cartList) {
                    return [find(), addGal()]
                }
                //
                // $q.all([self.listDef(), self.list()]).then(function(){
                //     console.log('stop');
                //     find();
                //     addGal();
                // });

                function find () {
                    _.forEach(products, function(elem){
                        if(_.find(self.defList, {uuid: elem.uuid})){
                            elem.def = true;
                        }
                })
                }
                function addGal () {
                    console.log('addgal')
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
    }]);