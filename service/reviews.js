angular.module('app')
    .service('ReviewsService', ['Httpquery', 'User', 'OrderService', function (Httpquery, User, OrderService) {
        return {
            list: function (product) {
                Httpquery.query({params1: 'reviews', params2:product.uuid}, function(res){
                    product.comments = res;
                });
            },
            addReviews: function (productId, reviews, callback) {
                var userId = User.get().uuid;
                var self = this;

                Httpquery.save({params1: 'reviews', params2: productId}, reviews, function (res) {
                    callback(null, res);
                }, function (err) {
                    callback(err);
                })
            },
            accessFormReviews: function (productId, callback) {
                OrderService.getListHistoryOrders(function (err, res) {
                    var order = _.find(res, {products: [{productID: productId}] });
                    callback(order);
                })
            }
        };
    }]);