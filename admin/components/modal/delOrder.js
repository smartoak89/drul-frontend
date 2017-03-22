angular.module('admin')
    .controller('delOrder',['$uibModalInstance', '$scope', 'RequestService',
        function($uibModalInstance, $scope, RequestService){
            $scope.error = null;
            $scope.delete = function(id){
                RequestService.deleteOrder(id, function(err, resp){
                    console.log(resp);
                    RequestService.listOrders.splice(RequestService.indexOrder, 1);
                    RequestService.indexOrder = null;
                    $uibModalInstance.dismiss('cancel');
                })
            }
        }]);