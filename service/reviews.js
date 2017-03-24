angular.module('app')
    .service('ReviewsService', ['Httpquery', 'User', 'OrderService', function (Httpquery, User, OrderService) {
        return {
            list: function (product) {

                var criteria = {params1: 'reviews', params2:product.uuid};

                if (User.isAdmin()) criteria.params3 = 'all';

                Httpquery.query(criteria, function(res){
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
                    if (order && order.status != 'Новый заказ') return callback(true);
                    callback(false);
                })
            }
        };
    }]);