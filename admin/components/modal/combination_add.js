angular.module('admin')
    .controller('combination_add',['$scope', '$uibModalInstance', 'Goods',
        function ($scope, $uibModalInstance, Goods){
            $scope.new = {};
            $scope.error = null;

            $scope.create = function () {
                console.log($scope.new);
                if (isValid() === true) {
                    Goods.addComb($scope.new, function (err) {
                        if (err) return $scope.error = err.error_message;
                        $uibModalInstance.dismiss();
                    });
                }
            };

            function isValid () {
                if (!$scope.new.name) return $scope.error = 'Введите название комбинации!';
                $scope.error = null;
                return true;
            }
        }]);
