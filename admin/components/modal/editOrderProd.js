angular.module('admin')
    .controller('editOrderProd',['$uibModalInstance', '$scope', 'Goods', 'HttpResource',
        function($uibModalInstance, $scope, Goods, HttpResource){
            //$scope.name = Goods.product.products[Goods.productIndex].name;
            $scope.curProd = angular.copy(Goods.product.products[Goods.productIndex]);
            $scope.curProd.productID = $scope.curProd.uuid;
            delete $scope.curProd.uuid;
            console.log($scope.curProd);
            $scope.error = null;
            $scope.combinations=[];
            Goods.listComb(function (combinations) {
                _.each(combinations, function(elem){
                    if(_.find($scope.curProd.combo, {slug: elem.slug})){
                        $scope.combinations.push(elem)
                    }
                })
            });
            $scope.countPlus = function(){
                $scope.curProd.count++;
            };
            $scope.countMinus = function(){
                $scope.curProd.count--;
                self.checkMinus();
            };
            $scope.checkMinus = function(){
                if($scope.curProd.count < 1) {
                    $scope.curProd.count = 1;
                }
            };
            $scope.change = function(){
                Goods.product.products[Goods.productIndex] = $scope.curProd;
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