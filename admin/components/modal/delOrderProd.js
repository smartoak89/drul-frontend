angular.module('admin')
    .controller('delOrderProd',['$uibModalInstance', '$scope', 'Goods', 'HttpResource', '$state',
        function($uibModalInstance, $scope, Goods, HttpResource, $state){
            $scope.name = Goods.product.products[Goods.productIndex].name;
            $scope.error = null;
            $scope.delete = function(){
                HttpResource.delete({params1: 'order', params2: Goods.product.uuid, params3: Goods.product.products[Goods.productIndex].uuid}, function(res){
                    Goods.product.products.splice(Goods.productIndex, 1);
                    $uibModalInstance.dismiss('cancel');
                    $state.reload();
                    Goods.product = null;
                    Goods.productIndex = null;
                }, function(err){
                    $scope.error = err;
                })
            }
        }]);