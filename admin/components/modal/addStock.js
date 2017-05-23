angular.module('admin')
    .controller('addStock',['$scope', '$uibModalInstance', 'Stocks',
        function ($scope, $uibModalInstance, Stocks){
            $scope.stocks = {};
            $scope.error = null;

            $scope.createStocks = function () {
                if (isValid() === true) {
                    Stocks.create($scope.stocks, function (err) {
                        if (err) return $scope.error = err.data.message;
                        $uibModalInstance.dismiss();
                    });
                }
            };

            function isValid () {
                if (!$scope.stocks.name) return $scope.error = 'Введите название акции';
                if (!$scope.stocks.percent) return $scope.error = 'Введите процент скидки';
                // if (!Stocks.dateExpires) return $scope.error = 'Выберите дату истечения акции';
                $scope.error = null;
                return true;
            }
        }]);
