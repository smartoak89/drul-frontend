angular.module('app')
    .service('OrderService', ['Httpquery', 'User', function (Httpquery, User) {

        return {
            listHistoryOrders: [],
            getListHistoryOrders: function (callback) {
                var self = this;

                Httpquery.query({params1: 'orders'}, function (res) {
                    self.listHistoryOrders = res;
                    callback(null, res);
                }, function (err) {
                    callback(err);
                })
            },
            doOrder: function (order, callback) {
                Httpquery.save({params1: 'order'}, order, function (res) {
                    callback(null, res);
                }, function (err) {
                    callback(err);
                })
            }
        };
    }]);