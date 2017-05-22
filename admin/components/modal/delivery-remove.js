angular.module('admin')
    .controller('delivery-remove',['$uibModalInstance', '$scope', 'modalData', 'DeliveryService',
        function($uibModalInstance, $scope, modalData, DeliveryService){
            $scope.data = modalData.method;
            $scope.error = null;

            $scope.delete = function(){
                DeliveryService.remove($scope.data.uuid).then(function (res) {
                    $uibModalInstance.close();
                }, function (err) {
                    $scope.error = err.data.message;
                });
            }
        }]);
