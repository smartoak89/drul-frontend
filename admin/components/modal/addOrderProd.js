angular.module('admin')
    .controller('addOrderProd',['$uibModalInstance', '$scope', 'Goods', 'HttpResource',
        function($uibModalInstance, $scope, Goods, HttpResource){
            //$scope.name = Goods.product.products[Goods.productIndex].name;
            $scope.curProd = angular.copy(Goods.product.products[Goods.productIndex]);
            $scope.curProd.productID = $scope.curProd.uuid;
            delete $scope.curProd.uuid;
            console.log($scope.curProd);
            $scope.error = null;
            $scope.countPlus = function(){
                $scope.curProd.count++;
            };
            $scope.countMinus = function(){
                $scope.curProd.count--;
                $scope.checkMinus();
            };
            $scope.checkMinus = function(){
                if($scope.curProd.count < 1) {
                    $scope.curProd.count = 1;
                }
            };
            $scope.change = function(){
                Goods.product.products[Goods.productIndex] = $scope.curProd;
                _.each(Goods.product.products, function(elem){
                    //elem.productID = elem.uuid;
                    console.log(elem);
                })
                HttpResource.put({params1: 'order', params2: Goods.product.uuid}, Goods.product, function(res){
                    console.log(res);
                    $uibModalInstance.dismiss('cancel');
                    Goods.product = null;
                    Goods.productIndex = null;
                }, function(err){
                    $scope.error = err;
                })
            }
        }]);