angular.module('admin')
    .controller('delGood',['$uibModalInstance', '$scope', 'Goods', 'HttpResource',
        function($uibModalInstance, $scope, Goods, HttpResource){
            $scope.name = Goods.product.name;
            $scope.error = null;
            $scope.delete = function(){
                    HttpResource.delete({params1:'product', params2:Goods.product.uuid}, function(resp){
                        Goods.products.splice(Goods.productIndex, 1);
                        $uibModalInstance.dismiss('cancel');
                        Goods.product = null;
                        Goods.productIndex = null;
                    }, function(err){
                        $scope.error = err;
                    })
            }
        }]);
