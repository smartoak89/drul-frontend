angular.module('admin')
    .controller('delOrderProd',['$uibModalInstance', '$scope', 'Goods', 'HttpResource',
        function($uibModalInstance, $scope, Goods, HttpResource){
            $scope.name = Goods.product.products[Goods.productIndex].name;
            $scope.error = null;
            $scope.delete = function(){
                HttpResource.delete({params1: 'order', params2: Goods.product.uuid, params3: Goods.product.products[Goods.productIndex].uuid}, function(res){
                    Goods.product.products.splice(Goods.productIndex, 1);
                    $uibModalInstance.dismiss('cancel');
                    Goods.product = null;
                    Goods.productIndex = null;
                }, function(err){
                    $scope.error = err;
                })
            }
        }]);