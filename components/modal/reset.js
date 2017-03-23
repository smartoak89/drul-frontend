angular.module('app')
    .controller('reset', ['$uibModalInstance', '$scope', '$rootScope', '$location',  'AuthService', '$timeout', function ($uibModalInstance, $scope, $rootScope, $location, AuthService, $timeout) {

        $scope.success = false;
        $scope.email = null;

        $scope.reset = function (email) {
            if (isValid() == true) {
                console.log('reset');
                AuthService.reset(email, function(err, res){
                    if(err){
                        $scope.error = err;
                    }else{
                        console.log(res);
                        $scope.error = null;
                        $scope.message = res.message;
                        $scope.success = true;
                        $timeout(function(){$uibModalInstance.dismiss()}, 4000);
                    }
                })
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