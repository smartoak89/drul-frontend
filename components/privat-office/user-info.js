angular.module('app')
    .component('userInfo', {
        templateUrl: "components/privat-office/user-info.html",
        controller: ['User', 'Httpquery', 'CurrencyService', function(User, Httpquery, CurrencyService) {
            var self = this;
            this.User = User.get();
            this.error = null;
            this.editmode = false;
            self.curr = CurrencyService.cy;

            this.save = function () {
                var self = this;
                isValid(self.user, function (err) {
                    if (err) return self.error = err;

                    Httpquery.put({params1: 'user', params2: self.user.uuid}, self.user, function (res) {
                        User.set(res);
                        console.log(res);
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
                var self = this;
                self.user = angular.copy(self.User);
                console.log(self.user)
            };


            function isValid (user, callback) {
                var reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                if (!user.email) return callback('Пожалуйста введите email!');
                if (!reg.test(user.email)) return callback('Некоректный email!');
                if (!user.phone) return callback('Укажите мобильный номер получателя!');
                if (user.phone.length<10 || user.phone.length>12) return callback('Мобильный телефон введен некорректно!');
                if (!user.password) return callback('Пожалуйста введите пароль!');

                return callback(null);
            }

        }]
    });