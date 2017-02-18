angular.module('app')
    .service('OrderService', ['Httpquery', 'User', 'Product', function (Httpquery, User, Product) {
        return {
            listHistoryOrders: [],
            getListHistoryOrders: function (callback) {
                var userId = User.active.uuid;
                var self = this;
                Httpquery.query({params1: 'orders', params2: userId}, function (res) {
                    self.listHistoryOrders = res;
                    // _.each(res, function (i) {
                    //     Product.getCurProd(i.product_id)
                    // })
                    console.log('list', self.listHistoryOrders);
                }, function (err) {
                    callback(err);
                })
            },
            doOrder: function (order, callback) {
                var userId = User.active.uuid;
                Httpquery.save({params1: 'order', params3: userId}, order, function (res) {
                    callback(null, res);
                }, function (err) {
                    callback(err);
                })
            }
        };
    }]);