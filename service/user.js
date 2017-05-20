angular.module('app')
    .service('User', ['$cookies', '$rootScope',  function ($cookies, $rootScope) {

            var active = null;
            var token = null;

            try {
                token = $cookies.get('token');
                active = JSON.parse($cookies.get('user'));
                console.log('token', token);
            } catch (ex) {
                active = null;
            }

            this.set = function(user) {
                active = user;
                $cookies.put('user', JSON.stringify(user));
                $rootScope.$broadcast('userActivate');
            };

            this.deactivate =function () {
                token = active = null;
                $cookies.remove('user');
                $cookies.remove('token');
                $rootScope.$broadcast('userDeactivate');
            };

            this.get = function() {
                return active;
            };


            this.token = function(value) {
                if (value) {
                    $cookies.put('token', value);
                    return token = value;
                }

                return token;
            };

            this.isAdmin = function () {
                if (active && active.permission) {
                    return  (active.permission == 'administrator') ? true : false;
                }

                return false;
            }
    }]);