angular.module('app')
    .component('userInfo', {
        templateUrl: "components/privat-office/user-info.html",
        controller: ['User', 'Httpquery', function(User, Httpquery) {
            var self = this;
            this.User = User.get();
            this.error = null;
            this.editmode = false;


            this.save = function () {
                var self = this;
                isValid(self.user, function (err) {
                    if (err) return self.error = err;

                    Httpquery.put({params1: 'user', params2: self.user.uuid}, self.user, function (res) {
                        User.set(res);
                        self.User = res;
                        self.editmode = false;
                        self.error = null;
                    }, function (err) {
                        console.log('error', err);
                        self.error = err.data.message;
                    })
                });
            };

            this.copy = function () {
                self.user = angular.copy(self.User);
            };


            function isValid (user, callback) {
                var reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                if (!user.email) return callback('Пожалуйста введите email!');
                if (!reg.test(user.email)) return callback('Некоректный email!');
                if (!user.password) return callback('Пожалуйста введите пароль!');

                return callback(null);
            }

        }]
    });