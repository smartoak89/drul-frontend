angular.module('app')
    .factory('User', ['Httpquery', '$cookies', function (Httpquery, $cookies) {
        function tryActivate () {
            try {
                return JSON.parse($cookies.get('user'))
            } catch (ex){
                return null;
            }
        }
        return {
            active: tryActivate(),
            set: function (user) {
                this.active = user;
                $cookies.put('user', JSON.stringify(user));
            },
            deactive: function () {
                this.active = null;
                $cookies.remove('user');
            },
            validate: function (user, callback) {
                var reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                if (!user.firstname) return callback('Пожалуйста введите имя!');
                if (!user.lastname) return callback('Пожалуйста введите Фамилию!');
                if (!user.email) return callback('Пожалуйста введите email!');
                if (!reg.test(user.email)) return callback('Некоректный email!');
                if (!user.phone) return callback('Пожалуйста введите номер телефона!');
                if (!user.password) return callback('Пожалуйста введите пароль!');
                if (user.password.length < 4) return callback('Пароль должен быть не менее 4 символов!');

                return callback(null);

            }

        };

    }]);