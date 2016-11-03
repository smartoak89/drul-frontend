angular.module('admin')
    .controller('removeStocks',['$uibModalInstance', '$scope', 'Stocks', 'HttpResource', 'modalData',
        function($uibModalInstance, $scope, Stocks, HttpResource, modalData){
            var id = modalData.stocks.uuid;
            $scope.name = modalData.stocks.name;

            $scope.delete = function () {
                Stocks.remove(id, function (err) {
                    if (err) return $scope.error = err;
                    $uibModalInstance.dismiss();
                })
            };

        }]);