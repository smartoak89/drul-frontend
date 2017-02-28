angular.module('app')
    .service('User', ['Httpquery', '$cookies', '$rootScope',  function (Httpquery, $cookies, $rootScope) {
            if (!$cookies.get('currency')) $cookies.put('currency', 'UAH');

            // this.activeMenu =  0;

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
                // active: null,
                // init: function (callback) {
                //     var self = this;
                //     var id = tryActivate();
                //     if (!id) return self.active = null;
                //     return Httpquery.get({params1: 'user', params2: id}, function (user) {
                //         self.active = user;
                //         console.log('user', user);
                //         callback();
                //     });
                // },
                // deactive: function () {
                //     this.active = null;
                //     $cookies.remove('user');
                // },
                // checkUser: function () {
                //     return active;
                // }
    }])
    // .factory('User', ['Httpquery', '$cookies', function (Httpquery, $cookies) {
    //     if (!$cookies.get('currency')) $cookies.put('currency', 'UAH');
    //
    //     var active = null;
    //
    //     try {
    //         active = JSON.parse($cookies.get('user'));
    //     } catch (ex) {
    //         active = null;
    //     }
    //
    //     function tryActivate () {
    //         try {
    //             return JSON.parse($cookies.get('user'));
    //         } catch (ex){
    //             return null;
    //         }
    //     }
    //     return {
    //         activeMenu: 0,
    //         set: function(user) {
    //             active = user;
    //             $cookies.put('user', JSON.stringify(user));
    //         },
    //         deactivate: function () {
    //             active = null;
    //             $cookies.remove('user');
    //         },
    //         get:  function() {
    //             return active;
    //         },
    //         // active: null,
    //         // init: function (callback) {
    //         //     var self = this;
    //         //     var id = tryActivate();
    //         //     if (!id) return self.active = null;
    //         //     return Httpquery.get({params1: 'user', params2: id}, function (user) {
    //         //         self.active = user;
    //         //         console.log('user', user);
    //         //         callback();
    //         //     });
    //         // },
    //         // deactive: function () {
    //         //     this.active = null;
    //         //     $cookies.remove('user');
    //         // },
    //         checkUser: function () {
    //             return active;
    //         }
    //         // validate: function (user, callback) {
    //         //     var reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //         //     if (!user.firstname) return callback('Пожалуйста введите имя!');
    //         //     if (!user.lastname) return callback('Пожалуйста введите Фамилию!');
    //         //     if (!user.email) return callback('Пожалуйста введите email!');
    //         //     if (!reg.test(user.email)) return callback('Некоректный email!');
    //         //     if (!user.phone) return callback('Пожалуйста введите номер телефона!');
    //         //     if (!user.state) return callback('Пожалуйста выберите страну!');
    //         //     if (!user.password) return callback('Пожалуйста введите пароль!');
    //         //     if (user.password.length < 4) return callback('Пароль должен быть не менее 4 символов!');
    //         //
    //         //     return callback(null);
    //         // }
    //     };
    //
    // }]);