angular.module('admin')
    .controller('delOrder',['$uibModalInstance', '$scope', 'RequestService', '$location', 'modalData',
        function($uibModalInstance, $scope, RequestService, $location, modalData){
            $scope.error = null;
            $scope.modalData = modalData;
            $scope.delete = function(){
                RequestService.deleteOrder(RequestService.idOrder, function(err, resp){
                    if(RequestService.returnToList){
                        $location.path('/admin/orders');
                    }else{
                        RequestService.listOrders.splice(RequestService.indexOrder, 1);
                    }
                    RequestService.returnToList = false;
                    RequestService.indexOrder = null;
                    RequestService.idOrder = null;

                    $uibModalInstance.dismiss('cancel');
                })
            }
        }]);