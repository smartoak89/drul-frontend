angular.module('app')
    .component('userInfo', {
        templateUrl: "components/privat-office/user-info.html",
        controller: ['User', 'Httpquery', 'CurrencyService', function(User, Httpquery, CurrencyService) {
            var self = this;
            this.User = User.get();
            this.error = null;
            this.editmode = false;
            self.curr = CurrencyService.cy;

            Httpquery.get({params1: 'user'}, function (user) {
                self.user = user;
            })

            this.save = function () {
                var self = this;
                isValid(self.user, function (err) {
                    if (err) return self.error = err;
                    console.log(self.user);
                    Httpquery.put({params1: 'user', params2: self.user.uuid}, self.user, function (res) {
                        User.set(res);
                        console.log(res);
                        self.user = res;
                        self.editmode = false;
                        self.error = null;
                    }, function (err) {
                        console.log('error', err);
                        self.error = err.data.message;
                    })
                });
            };

            this.copy = function () {
                var self = this;
                self.user = angular.copy(self.user);
                console.log(self.user)
            };


            function isValid (user, callback) {
                var reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                if (!user.email) return callback('Пожалуйста введите email!');
                if (!reg.test(user.email)) return callback('Некоректный email!');
                if (!user.phone) return callback('Укажите мобильный телефон!');
                if (user.phone.length<11 || user.phone.length>14) return callback('Мобильный телефон введен некорректно!');
                if (!user.password) return callback('Пожалуйста введите пароль!');

                return callback(null);
            }

        }]
    });