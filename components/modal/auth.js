angular.module('app')
    .controller('auth', ['$uibModalInstance', '$scope', '$rootScope', '$location', 'Httpquery', 'User', 'Cart', function ($uibModalInstance, $scope, $rootScope, $location, Httpquery, User, Cart) {
        $scope.user = {};
        $scope.savePro = {
            image: '',
            combo: []
        }
        $scope.login = function () {
            if (isValid() == true) {
                Httpquery.save({params1: 'user', params2: 'auth'}, $scope.user, function (res) {

                    User.token(res.token);

                    Httpquery.get({params1: 'user'}, function (user) {
                       User.set(user);
                       console.info('User login', user);
                    });

                    $scope.close();
                    $location.path('/');
                }, function (ex) {
                    $scope.error = ex.data.message;
                    console.log('error', ex);
                })
            }
        };

        var reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        function isValid () {
            if (!$scope.user.email) return $scope.error = 'Пожалуйста введите email!';
            if (!reg.test($scope.user.email)) return $scope.error = 'Некоректный email!';
            if (!$scope.user.password) return $scope.error = 'Пожалуйста введите пароль!';
            if ($scope.user.password.length < 4) return $scope.error = 'Пароль должен быть не менее 4 символов!';

            $scope.error = null;
            return true;
        }

        $scope.close = function () {
            $uibModalInstance.dismiss();
        }
    }]);