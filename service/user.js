angular.module('app')
    .service('User', ['$cookies', '$rootScope',  function ($cookies, $rootScope) {

            this.activeMenu =  0;

            var active = null;
            var token = null;

            try {
                active = JSON.parse($cookies.get('user'));
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
                if (value) return token = value;

                return token;
            };

            this.isAdmin = function () {
                if (active && active.permission) {
                    return  (active.permission == 'administrator') ? true : false;
                }

                return false;
            }
    }]);