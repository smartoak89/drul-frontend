angular.module('app')
    .service('OrderService', ['Httpquery', 'User', function (Httpquery, User) {

        if(User.get()){
            var userId = User.get().uuid;
        }

        return {
            listHistoryOrders: [],
            getListHistoryOrders: function (callback) {
                var self = this;;
                console.log(userId)
                Httpquery.query({params1: 'orders', params2: userId}, function (res) {
                    self.listHistoryOrders = res;
                    callback(null, res);
                }, function (err) {
                    callback(err);
                })
            },
            doOrder: function (order, callback) {
                Httpquery.save({params1: 'order', params3: userId}, order, function (res) {
                    callback(null, res);
                }, function (err) {
                    callback(err);
                })
            }
        };
    }]);