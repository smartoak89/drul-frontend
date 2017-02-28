angular.module('app')
    .service('ReviewsService', ['Httpquery', 'User', 'OrderService', function (Httpquery, User, OrderService) {
        return {
            addReviews: function (productId, reviews, callback) {
                var userId = User.get().uuid;
                var self = this;

                Httpquery.save({params1: 'reviews', params2: productId, params3: userId}, reviews, function (res) {
                    console.log('res reviews', res);
                    callback(null, res);
                }, function (err) {
                    callback(err);
                })
            },
            accessFormReviews: function (productId, callback) {
                OrderService.getListHistoryOrders(function (err, res) {
                    console.log('getlistHist', res)
                    console.log('productId', productId)
                    var order = _.find(res, {products: [{productID: productId}] });
                    console.log('res find', order);
                    callback(order);
                })
            }
        };
    }]);