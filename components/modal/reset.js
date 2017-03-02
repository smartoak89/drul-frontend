angular.module('app')
    .controller('reset', ['$uibModalInstance', '$scope', '$rootScope', '$location',  function ($uibModalInstance, $scope, $rootScope, $location) {

        $scope.success = false;
        $scope.email = null;

        $scope.reset = function () {
            if (isValid() == true) {
                console.log('reset');
                $scope.error = null;
                $scope.success = true;
            }
        };

        var reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        function isValid () {
            if (!$scope.email) return $scope.error = 'Пожалуйста введите email!';
            if (!reg.test($scope.email)) return $scope.error = 'Некоректный email!';

            $scope.error = null;
            return true;
        }

        $scope.close = function () {
            $uibModalInstance.dismiss();
        }
    }]);