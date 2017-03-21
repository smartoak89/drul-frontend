angular.module('admin')
    .controller('delOrder',['$uibModalInstance', '$scope', 'RequestService',
        function($uibModalInstance, $scope, RequestService){
            $scope.name = Goods.product.name;
            $scope.error = null;
            $scope.delete = function(){
                RequestService.delete({params1:'product', params2:Goods.product.uuid}, function(resp){
                    console.log(resp);
                    Goods.products.splice(Goods.productIndex, 1);
                    $uibModalInstance.dismiss('cancel');
                    Goods.product = null;
                    Goods.productIndex = null;
                }, function(err){
                    $scope.error = err;
                })
            }
        }]);