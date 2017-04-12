/**
 * Created by worker on 12.04.2017.
 */
angular.module('admin')
    .controller('vendor_value',['$scope', '$uibModalInstance', 'Vendors', 'modalData',
        function ($scope, $uibModalInstance, Vendors, modalData){
            $scope.placeholder = 'Через знак " , " можно добавить несколько значений ';
            $scope.new = angular.copy(modalData.$ctrl.vendor);
            $scope.error = null;
            //var index = modalData.$index;

            if ($scope.new.newValue) delete $scope.new.newValue;

            $scope.add = function () {
                if (isValid() === true) {
                    concat();
                    Vendors.putVendor($scope.new, function (err) {
                        console.log($scope.new);
                        if (err) return $scope.error = err.error_message;
                        modalData.$ctrl.vendor = $scope.new;
                        $uibModalInstance.dismiss();
                    });
                }
            };
            function concat () {
                var common = $scope.new.value.concat(parse());
                // common.sort(function(a, b){
                //     a = a.toLowerCase();
                //     b = b.toLowerCase();
                //
                //     if(a < b) return -1;
                //     if(a > b) return 1;
                //     return 0;
                // });
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
