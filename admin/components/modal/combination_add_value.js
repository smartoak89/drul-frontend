angular.module('admin')
    .controller('combination_add_value',['$scope', '$uibModalInstance', 'Goods', 'modalData',
        function ($scope, $uibModalInstance, Goods, modalData){
            $scope.placeholder = 'Через знак " , " можно добавить несколько значений ';
            $scope.new = angular.copy(modalData.combination);
            $scope.error = null;
            var index = modalData.$index;

            if ($scope.new.newValue) delete $scope.new.newValue;

            $scope.create = function () {
                console.log($scope.new);
                if (isValid() === true) {
                    console.log('new val', $scope.new);
                    concat();
                    Goods.updateComb($scope.new, index, function (err) {
                        if (err) return $scope.error = err.error_message;
                        $uibModalInstance.dismiss();
                    });
                }
            };
            function concat () {
                var common = $scope.new.value.concat(parse());
                common.sort(function(a, b){
                    a = a.toLowerCase();
                    b = b.toLowerCase();

                    if(a < b) return -1;
                    if(a > b) return 1;
                    return 0;
                });
                return $scope.new.value = common;
            }
            function parse () {
                var value = $scope.new.newValue.split(',');
                angular.forEach(value, function (string, i) {
                    value[i] = string.trim();
                });
                return value;
            }

            function isValid () {
                if (!$scope.new.newValue) return $scope.error = 'Введите минимум одно значение !';
                $scope.error = null;
                return true;
            }
        }]);
