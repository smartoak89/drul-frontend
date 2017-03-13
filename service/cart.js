angular.module('app')
    .service('Cart', ['$rootScope', 'Httpquery', 'User', 'Currency', '$log', '$q', '$http', 'Conf', '$timeout', function ($rootScope, Httpquery, User, Currency, $log, $q, $http, Conf, $timeout) {
        var cartList;

        return {
            add: function (product, option, callback) {
                var user = User.get();

                var productToAdd = {
                    combo: option,
                    image: product.photo.uuid
                };

                if (user) {
                    Httpquery.put({params1: 'cart', params2: product.uuid}, productToAdd, function (res) {
                        cartList.push(res);
                        console.log('res', res);
                        $rootScope.$broadcast('changeCart');

                        callback();
                    }, function (err) {
                        console.error('can\'t add to cart', err);
                        callback(err);
                    })
                } else {

                    if (!cartList) cartList = [];
                    cartList.push(productToAdd);

                    $rootScope.$broadcast('changeCart');
                }
            },
            list: function () {

                var user = User.get();

                if (user) {

                    Httpquery.query({params1: 'cart'}, function (res) {
                        $timeout(function () { $rootScope.$broadcast('changeCart'); }, 50);

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
            remove: function (product, callback) {
                var self = this;
                var user = User.get();

                if (user) {
                    console.log('product', product);
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