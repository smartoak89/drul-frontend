angular.module('app')
    .service('Cart', ['Httpquery', 'User', 'Currency', '$log', '$q', 'Product',function (Httpquery, User, Currency, $log, $q, Product) {
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
                Httpquery.put({params1: 'deferred', params2: User.active.uuid, params3: product.uuid}, function (res) {
                    console.log('Deferred res', res);
                    if (!res.message){
                        self.defList.push(product);
                    }
                }, function (err) {
                    console.log('Deferred err', res);
                })
            },
            delFromDeferred: function(product) {
                var self = this;
                Httpquery.delete({params1:'deferred', params2: User.active.uuid, params3: product.uuid}, function(res){
                    console.log(res);
                    self.defList.splice(_.findIndex(self.defList, {uuid: product.uuid}),1);
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
            list: function () {
                var self = this;
                var deffer = $q.defer();
                var user = User.checkUser();
                if (user) {
                    if (self.cartList === null) {
                        //console.log(user.uuid);
                        Httpquery.query({params1: 'cart', params2: user.uuid}, function (res) {
                            //$log.info('response cartList ', res);
                            deffer.resolve(res);
                            self.cartList = res;
                        }, function (err) {
                            console.log(err);
                            deffer.reject(err);
                        })
                    }
                }
                return deffer.promise;
                //TODO: user is not active
            },
            listDef: function () {
                var self = this;
                var deffer = $q.defer();
                var user = User.checkUser()
                if (user) {
                    if (self.defList === null) {
                        Httpquery.query({params1: 'deferred', params2: user.uuid}, function (res) {
                            //$log.info('response defList ', res);
                            deffer.resolve(res);
                            self.defList = res;
                        }, function (err) {
                            console.log(err);
                            deffer.reject(err);
                        })
                    }
                }
                return deffer.promise;
                //TODO: user is not active
            },
            save: function (product) {
                var self = this;
                //var userID = User.active.uuid;
                console.log('UserActive', User);
                Httpquery.put({params1: 'cart', params2: User.active.uuid, params3: product.uuid}, function (res) {
                    console.log('successAddToCart', res);
                        console.log(self.cartList);
                        self.cartList.push(res);
                }, function (err) {
                    console.log('errAddToCart', err);
                })
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
            anyFunc: function(){
                var self = this;
                $q.all([self.listDef(), self.list(), Product.getList()]).then(function(){
                    _.forEach(Product.products, function(elem){
                        if(_.find(self.defList, {uuid: elem.uuid})){
                            elem.def = true;
                        }
                    });
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