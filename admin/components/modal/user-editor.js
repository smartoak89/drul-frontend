angular.module('app')
    .controller('user-editor', ['$scope', '$uibModalInstance', 'modalData', 'Users',
        function ($scope, $uibModalInstance, modalData, Users) {
            $scope.user = angular.copy(modalData.user);
            $scope.error = null;

            $scope.edit = function () {
                validate($scope.user, function (err) {
                    if (err) return $scope.error = err;
                    $scope.error = null;
                })
            };

            $scope.close = function () {
                $uibModalInstance.dismiss();
            };

            function validate (user, callback) {
                var reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                if (!user.email) return callback('Пожалуйста введите email!');
                if (!reg.test(user.email)) return callback('Некоректный email!');

                return callback(null);

            }
    }]);