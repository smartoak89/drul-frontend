angular.module('app')
    .service('Cart', ['$rootScope', 'Httpquery', 'User', '$log', '$q', '$http', 'Conf', '$timeout', 'CurrencyService',
        function ($rootScope, Httpquery, User, $log, $q, $http, Conf, $timeout, CurrencyService) {
            var cartList = [];

            return {
                init: function () {

                    var self = this;

                    if (cartList.length > 0) {
                        console.log(cartList);
                        var promises = cartList.map(function (product) {

                            return $q(function (resolve, reject) {
                                self.add(product, product.combo, function (err) {

                                    if (err) return reject(err);
                                    return resolve();
                                })
                            })
                        });

                        $q.all(promises).then(function () {
                            self.list(function () {});
                        })
                    } else {
                        self.list(function () {});
                    }
                },
                add: function (product, option, callback) {
                    var user = User.get();

                    if(option){
                        var productToAdd = {
                            combo: option,
                            image: product.photo.uuid
                        };
                    }


                    if (user) {
                        _.each(cartList, function (tov) {
                            if(!tov.combo[0]){
                                // console.log('+')
                                tov.combo = [];
                                // console.log(tov.combo.length);
                                // console.log(product.combo.length);
                                // console.log(tov.combo == product.combo);
                                // console.log(tov.product_uuid == product.uuid);
                                // if (tov.product_uuid == product.uuid && tov.combo.length == product.combo.length) console.log('bl9')
                            }

                            // if (tov.product_uuid == product.uuid && tov.combo == product.combo) console.log('bl9')
                        })
                        Httpquery.put({params1: 'cart', params2: product.uuid}, productToAdd, function (res) {
                            CurrencyService.changePrice(res);
                            product.cart = true;
                            cartList.push(res);
                            $rootScope.$broadcast('changeCart');

                            callback();
                        }, function (err) {
                            console.error('can\'t add to cart', err);
                            callback(err);
                        })
                    } else {
                        var copy = angular.copy(product);

                        copy.combo = option;
                        copy.image = product.photo.uuid;
                        CurrencyService.changePrice(copy);
                        cartList.push(copy);
                        callback();
                        $rootScope.$broadcast('changeCart');
                    }
                },
                list: function (callback) {
                    var self = this;
                    var user = User.get();

                    if (user) {

                        Httpquery.query({params1: 'cart'}, function (res) {
                            $timeout(function () { $rootScope.$broadcast('changeCart'); }, 50);

                            _.each(res, function (product) {
                                CurrencyService.changePrice(product);
                            });

                            cartList = res;
                            callback(cartList);
                        }, function (err) {
                            console.error('can\'t get cart list', err);
                        });
                    }else{
                        callback(cartList);
                    }
                },
                wasCart: function (product) {
                    var id = product.uuid;

                    var find = _.find(cartList, {product_uuid: id});

                    if (find) {
                        product.cart = true;
                    } else {
                        product.cart = false;
                    }
                    return false;
                },
                getList: function () {
                    return cartList;
                },
                remove: function (product, callback) {
                    var self = this;
                    var user = User.get();

                    if (user) {
                        var qwe = {
                            params1:'cart',
                            params2: product.uuid
                        };

                        Httpquery.delete(qwe, function(){
                            self.removeFromCartList(product);
                            callback();
                        }, function(err){
                            callback(err);
                        });
                    } else {
                        self.removeFromCartList(product);
                    }
                },
                removeFromCartList: function (product) {
                    _.remove(cartList, product);
                    $rootScope.$broadcast('changeCart');
                },
                clear: function () {
                    var self = this;

                    _.each(cartList, function(product) {
                        self.remove(product, function () {
                            self.removeFromCartList(product);
                            $rootScope.$broadcast('changeCart');
                        })
                    });
                },
                out: function () {
                    cartList = [];
                    $rootScope.$broadcast('changeCart');
                }
        };
    }]);