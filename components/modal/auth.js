angular.module('app')
    .controller('auth', ['$uibModalInstance', '$scope', '$location', 'AuthService',  function ($uibModalInstance, $scope, $location, AuthService) {
        $scope.user = {};

        $scope.login = function () {
            if (isValid() == true) {

                AuthService.post($scope.user, function (err) {

                    if(err) return  $scope.error = err.data.message;

                    $scope.close();
                    $location.path('/');
                });
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