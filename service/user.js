angular.module('app')
    .service('User', ['Httpquery', '$cookies', '$rootScope',  function (Httpquery, $cookies, $rootScope) {

            this.activeMenu =  0;

            var active = null;

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
                active = null;
                $cookies.remove('user');
                $rootScope.$broadcast('userDeactivate');
            };

            this.get = function() {
                return active;
            };

            this.isAdmin = function () {
                if (active && active.permission) {
                    return  (active.permission == 'administrator') ? true : false;
                }

                return false;
            }
    }]);