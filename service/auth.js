angular.module('app')
    .service('AuthService', ['Httpquery', 'User', function(Httpquery, User) {

        var self = this;

        this.post = function (userData, callback){
            Httpquery.save({params1: 'user', params2: 'auth'}, userData, function (res) {

                User.token(res.token);

                self.get(callback)

            }, function (err) {
                callback(err)
            })
        };

        this.get = function (callback) {

            Httpquery.get({params1: 'user'}, function (user) {
                User.set(user);

                callback();
            });
        }
    }]);