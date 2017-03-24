angular.module('admin')
    .controller('combination_add',['$scope', '$uibModalInstance', 'Goods', 'Categories',
        function ($scope, $uibModalInstance, Goods, Categories){
            $scope.new = {};
            $scope.error = null;

            $scope.create = function () {
                if (isValid() === true) {
                    $scope.new.slug = Categories.translite($scope.new.name);
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
