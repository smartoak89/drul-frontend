angular.module('app')
    .factory('SortService', ['Httpquery', 'Product', 'Cart', function (Httpquery, Product, Cart) {
        return {
            orderBy: function (criteria) {
                var query = { params1: 'sort' };
                for (var i in criteria) {
                    query[i] = criteria[i]
                }
                Httpquery.query( query , function (res) {
                    console.info('order success ', res);
                    Product.products = res;
                    Product.changeCurrency();
                    Product.getGallery(Product.products);
                    Cart.getCartAndDeferred(Product.products);
                }, function (err) {
                    console.error('order error ', err);
                });
            }
        }
    }]);