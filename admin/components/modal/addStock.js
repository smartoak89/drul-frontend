angular.module('admin')
    .controller('addStock',['$scope', 'Stocks',
        function ($scope, Stocks){
            $scope.stocks = {};
            $scope.error = null;

            $scope.createStocks = function () {
                console.log($scope.stocks);
                if (isValid() === true) {
                    Stocks.create($scope.stocks, function (err) {
                        console.log(err);
                        $scope.error = err;
                    });
                }
            };

            function isValid () {
                if (!$scope.stocks.name) return $scope.error = 'Введите название акции';
                if (!$scope.stocks.percent) return $scope.error = 'Введите процент скидки';
                if (!Stocks.dateExpires) return $scope.error = 'Выберите дату истечения акции';
                $scope.error = null;
                return true;
            }
        }]);
