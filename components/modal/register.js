angular.module('app')
    .controller('register', ['$uibModalInstance', '$scope', 'Httpquery', 'User', function ($uibModalInstance, $scope, Httpquery, User) {
        $scope.user = {};
        $scope.error = null;

        $scope.register = function () {
            isValid($scope.user, function (err) {
                if (err) return $scope.error = err;

                Httpquery.save({params1: 'user', params2: 'register'}, $scope.user, function (res) {
                    console.log('Register success', res);
                    User.set(res);
                    $scope.close();
                }, function (ex) {
                    $scope.error = ex.data.message;
                    console.log('error', ex);
                })
            });
        };

        $scope.close = function () {
            $uibModalInstance.dismiss();
        }

        function isValid(user, callback) {
            var reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (!user.email) return callback('Пожалуйста введите email!');
            if (!reg.test(user.email)) return callback('Некоректный email!');
            if (!user.password) return callback('Пожалуйста введите пароль!');
            if (user.password.length < 4) return callback('Пароль должен быть не менее 4 символов!');
            if (user.password != user.repassword) return callback('Повтор пароля не совпадает!');

            return callback(null);
        }
    }]);