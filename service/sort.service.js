angular.module('app')
    .factory('SortService', ['Httpquery', 'Product', 'Cart', '$location',
        function (Httpquery, Product, Cart, $location) {
            var query = {
                params1: 'products',
                skip: 0
            };
            return {
                orderBy: function (criteria) {
                    if (criteria) query.skip = 0;
                    if (currentCategory()) query['category'] = currentCategory();
                    for (var i in criteria) {
                        query[i] = criteria[i]
                    }
                    // Httpquery.query( query , function (res) {
                    //     console.info('order success ', res);
                    //     if (query.skip === 0) {
                    //         Product.products = res;
                    //     } else {
                    //         concat(res);
                    //     }
                    //     // Product.changeCurrency();
                    //     Product.getGallery(res);
                    //     Cart.getCartAndDeferred(res);
                    // }, function (err) {
                    //     console.error('order error ', err);
                    // });
                },
                showMore: function () {
                    query.skip += 1;
                    this.orderBy();
                }
            };
            function concat(arr) {
                angular.forEach(arr, function (product) {
                    Product.products.push(product);
                });
            }
            function currentCategory () {
                var location = $location.$$path.split('/').pop();
                return  location == '/' ? '' : location;
            }
        }]);