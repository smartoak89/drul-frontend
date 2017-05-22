angular.module('admin')
    .controller('delivery-add',['$uibModalInstance', '$scope', 'DeliveryService',
        function($uibModalInstance, $scope, DeliveryService){
            $scope.error = null;

            $scope.delivery = {
                price: {
                    amount: 0,
                    currency: 'UAH'
                },
                country: 'Украина',
                free: 0
            };


            $scope.save = function () {
                if (isValid() == true) {
                    DeliveryService.post($scope.delivery).then(function (res) {
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