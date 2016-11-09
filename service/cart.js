angular.module('app')
    .service('Cart', ['Httpquery', 'User', 'Currency', function (Httpquery, User, Currency) {
        var cart = [];
        return {
            cartList: null,
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
                console.log('deferred prod', product);
                Httpquery.save({params1: 'deferred', params2: product.uuid}, {user: User.uuid}, function (res) {
                    console.log('Deferred res', res);
                }, function (err) {
                    console.log('Deferred err', res);
                })
            },
            list: function () {
                var self = this;
                Currency.refresh();
                if (User.checkUser()) {
                    if (self.cartList === null) {
                        return Httpquery.query({params1: 'cart', params2: User.active.uuid}, function (res) {
                            console.log('res', res);
                            return self.cartList = res;

                        })
                    }
                    return self.cartList;
                }
                //TODO: user is not active
            },
            save: function (id) {
                var userID = User.active.uuid;
                console.log('UserActive', user);
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