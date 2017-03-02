angular.module('app')
    .service('DeferredService', ['Httpquery', 'User', function (Httpquery, User) {
        var user = User.get();
        var defferedList;

        this.list = function (callback) {

            if (user && !defferedList) {

                Httpquery.query({params1: 'deferred', params2: user.uuid}, function (res) {
                    defferedList = res;
                    callback(defferedList);
                }, function (err) {
                    console.error('can\'t query deferred', err);
                });

                return;
            }

            if (user) return callback(defferedList)
        };

        this.wasDeferred = function (product) {
            var id = product.uuid;

            var find = _.find(defferedList, {uuid: id});

            if (find) {
                product.def = true;
            } else {
                product.def = false;
            }

            return false;
        }

    }]);