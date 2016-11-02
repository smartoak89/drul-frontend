angular.module('admin')
    .controller('addStock',['$uibModalInstance', '$scope',
        function ($uibModalInstance, $scope){
            $scope.stock = {};
            $scope.error = null;

            $scope.addSale = function () {
                if (!isValid() === true) {

                }
            };

            function isValid () {
                if (!$scope.stock.name) return $scope.error = 'Введите название акции';
                if (!$scope.stock.percent) return $scope.error = 'Введите процент скидки';
                $scope.error = null;
                return true;
            }
        }]);
