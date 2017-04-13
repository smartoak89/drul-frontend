angular.module('admin')
    .controller('replenishAcc',['$scope', '$uibModalInstance', 'modalData', 'Users',
        function ($scope, $uibModalInstance, modalData, Users){
            $scope.user = angular.copy(modalData.user);
            $scope.repl = '';
            $scope.error = null;

            $scope.replenish = function () {
                if (isValid() === true) {
                    console.log($scope.repl)
                }
            };

            function isValid () {
                if (!$scope.repl) return $scope.error = 'Введите сумму!';
                $scope.error = null;
                return true;
            }
        }]);
