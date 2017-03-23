angular.module('app')
    .service('AuthService', ['Httpquery', 'User', function(Httpquery, User) {

        var self = this;

        this.post = function (userData, callback){
            Httpquery.save({params1: 'user', params2: 'auth'}, userData, function (res) {
                console.log('re auth', res)
                User.token(res.token);

                self.get(callback)

            }, function (err) {
                console.error('re auth', err)
                callback(err)
            })
        };

        this.get = function (callback) {

            Httpquery.get({params1: 'user'}, function (user) {
                User.set(user);

                callback();
            });
        };

        this.reset = function(email, callback) {
            Httpquery.save({params1: 'reset'}, {email: email}, function(res){
                callback(null, res);
            }, function(err){
                callback(err)
            })
        };

        this.resetGet = function(token, callback) {
            Httpquery.get({params1: 'reset', params2: token}, function(res){
                callback(null, res);
            }, function(err){
                callback(err)
            })
        };

        this.resetPass = function (pass, token, callback) {
            Httpquery.save({params1: 'reset', params2: token}, {password: pass}, function(res){
                callback(null, res);
            }, function(err){
                callback(err)
            })
        }
    }]);