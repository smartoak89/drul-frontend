angular.module('admin')
    .controller('delOrder',['$uibModalInstance', '$scope', 'RequestService', '$location', 'modalData',
        function($uibModalInstance, $scope, RequestService, $location, modalData){
            $scope.error = null;
            $scope.modalData = modalData;
            $scope.delete = function(){
                RequestService.deleteOrder(RequestService.idOrder, function(err, resp){
                    if(RequestService.returnToList){
                        $location.path('/admin-panel/orders');
                    }else{
                        // console.log(_.findIndex(RequestService.listOrders, {uuid:RequestService.idOrder}));
                        RequestService.listOrders.splice(_.findIndex(RequestService.listOrders, {uuid:RequestService.idOrder}), 1);
                    }
                    // RequestService.returnToList = false;
                    // RequestService.indexOrder = null;
                    // RequestService.idOrder = null;

                    $uibModalInstance.dismiss('cancel');
                })
            }
        }]);