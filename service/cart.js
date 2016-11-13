angular.module('app')
    .service('Cart', ['Httpquery', 'User', 'Currency', '$log', function (Httpquery, User, Currency, $log) {
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
                var self = this;
                Httpquery.save({params1: 'deferred', params2: product.uuid}, {user: User.active.uuid}, function (res) {
                    console.log('Deferred res', res);
                }, function (err) {
                    console.log('Deferred err', res);
                })
            },
            list: function () {
                var self = this;

                var user = User.checkUser();
                if (user) {
                    if (self.cartList === null) {
                        //console.log(user.uuid);
                        return Httpquery.query({params1: 'cart', params2: user.uuid}, function (res) {
                            $log.info('response cartList ', res);
                            return self.cartList = res;

                        })
                    }
                    return self.cartList;
                }
                //TODO: user is not active
            },
            listDef: function () {
                var self = this;
                var user = User.checkUser()
                if (user) {
                    if (self.defList === null) {
                        return Httpquery.query({params1: 'deferred', params2: user.uuid}, function (res) {
                            $log.info('response defList ', res);
                            return self.defList = res;

                        })
                    }
                    return self.defList;
                }
                //TODO: user is not active
            },
            save: function (id) {
                var userID = User.active.uuid;
                console.log('UserActive', User);
                Httpquery.save({params1: 'cart', params2: id}, {user: userID}, function (res) {
                    console.log('successAddToCart', res);
                }, function (err) {
                    console.log('errAddToCart', err);
                })
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