angular.module('app')
    .factory('User', ['Httpquery', '$cookies', function (Httpquery, $cookies) {
        if (!$cookies.get('currency')) $cookies.put('currency', 'UAH');
        function tryActivate () {
            try {
                return JSON.parse($cookies.get('user'));
            } catch (ex){
                return null;
            }
        }
        return {
            active: null,
            init: function (callback) {
                var self = this;
                var id = tryActivate();
                if (!id) return self.active = null;
                return Httpquery.get({params1: 'user', params2: id}, function (user) {
                    self.active = user;
                    callback();
                });
            },
            set: function (user) {
                this.active = user;
                $cookies.put('user', JSON.stringify(user.uuid));
            },
            deactive: function () {
                this.active = null;
                $cookies.remove('user');
            },
            checkUser: function () {
                return this.active;
            },
            validate: function (user, callback) {
                var reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                if (!user.firstname) return callback('Пожалуйста введите имя!');
                if (!user.lastname) return callback('Пожалуйста введите Фамилию!');
                if (!user.email) return callback('Пожалуйста введите email!');
                if (!reg.test(user.email)) return callback('Некоректный email!');
                if (!user.phone) return callback('Пожалуйста введите номер телефона!');
                if (!user.state) return callback('Пожалуйста выберите страну!');
                if (!user.password) return callback('Пожалуйста введите пароль!');
                if (user.password.length < 4) return callback('Пароль должен быть не менее 4 символов!');

                return callback(null);
            },
            activeMenu: 0

        };

    }]);