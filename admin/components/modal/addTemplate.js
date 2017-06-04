angular.module('admin')
    .controller('addTemplate',['$scope', '$uibModalInstance', 'Stocks',
        function ($scope, $uibModalInstance, Stocks){
            $scope.template = {};
            $scope.error = null;

            $scope.createTemplate = function () {
                if (isValid() === true) {
                    Stocks.create($scope.stocks, function (err) {
                        if (err) return $scope.error = err.data.message;
                        $uibModalInstance.dismiss();
                    });
                }
            };

            function isValid () {
                if (!$scope.template.subject) return $scope.error = 'Введите тему шаблона';
                if (!$scope.template.body) return $scope.error = 'Введите сообщение шаблона';
                $scope.error = null;
                return true;
            }
        }]);
