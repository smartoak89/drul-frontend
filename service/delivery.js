angular.module('app')
    .service('DeliveryService', ['Httpquery', '$q', function (Httpquery, $q) {
        this.methods = [];
        this.post = function(method) {
            var self = this;

            return $q(function (resolve, reject) {
                Httpquery.save({params1: 'delivery'}, method, function (res) {
                    self.methods.push(res);
                    resolve(res);
                }, function (err) {
                    reject(err)
                })
            })
        };

        this.list = function () {
            var self = this;

            Httpquery.query({params1:'deliveries'}, function (res) {
                self.methods = res;
                console.log('methods', res)
            })
        };

        this.remove = function (id) {
            var self = this;

            return $q(function (resolve, reject) {
                Httpquery.delete({params1: 'delivery', params2: id}, function (res) {
                    _.remove(self.methods, {uuid: id});
                    resolve(res);
                }, function (err) {
                    reject(err)
                })
            })
        };

        this.put = function (method) {
            return $q(function (resolve, reject) {
                Httpquery.put({params1: 'delivery', params2: method.uuid}, method, function (res) {
                    resolve(res);
                }, function (err) {
                    reject(err)
                })
            })
        }

    }]);
