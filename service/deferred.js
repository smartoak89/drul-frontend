angular.module('app')
    .service('DeferredService', ['Httpquery', 'User', function (Httpquery, User) {
        var user = User.get();
        var defferedList;

        this.list = function () {

            if (user && !defferedList) {

                Httpquery.query({params1: 'deferred', params2: user.uuid}, function (res) {
                    defferedList = res;
                }, function (err) {
                    console.error('can\'t query deferred', err);
                });
            }
        }

        this.wasDeferred = function (id) {
            var
            if () return true;

            return false;
        }


    }]);