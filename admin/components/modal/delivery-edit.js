angular.module('admin')
    .controller('delivery-edit',['$uibModalInstance', '$scope', 'DeliveryService', 'modalData',
        function($uibModalInstance, $scope, DeliveryService, modalData){
            $scope.error = null;
            $scope.data = modalData.method;

            $scope.delivery = angular.copy($scope.data);


            $scope.edit = function () {
                if (isValid() == true) {
                    DeliveryService.put($scope.delivery).then(function (res) {
                        modalData.method = res;
                        $uibModalInstance.close();
                    }, function(err) {
                        $scope.error = err.data.message;
                    });
                }

            };

            function isValid () {
                if (!$scope.delivery.name) return $scope.error = 'Введите название способа доставки';
                if (!$scope.delivery.price.amount) return $scope.error = 'Введите стоимость доставки';
                if (!$scope.delivery.free) return $scope.error = 'Введите сумму с которой доставка бесплатна';

                $scope.error = null;
                return true;
            }

        }]);