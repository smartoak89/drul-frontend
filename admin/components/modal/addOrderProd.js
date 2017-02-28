angular.module('admin')
    .controller('addOrderProd',['$uibModalInstance', '$scope', 'Goods', 'HttpResource', 'modalData',
        function($uibModalInstance, $scope, Goods, HttpResource, modalData){
            $scope.curProd = modalData.product;
            console.log($scope.curProd);
            $scope.curProd.count = 1;
            if(!$scope.curProd.image){
                $scope.curProd.image = angular.copy($scope.curProd.photo.uuid);
            }
            if(!$scope.curProd.allCombos){
                $scope.curProd.allCombos = angular.copy($scope.curProd.combo);
            }
            $scope.curProd.combo = null;
            if($scope.curProd.uuid){
                $scope.curProd.productID = $scope.curProd.uuid;
                delete $scope.curProd.uuid;
            }
            delete $scope.curProd.photo;
            delete $scope.curProd.gallery;
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
            $scope.cancel = function(){
                $uibModalInstance.dismiss('cancel');
                Goods.product = null;
                Goods.productIndex = null;
            };
            $scope.change = function(){
                Goods.product.products.push($scope.curProd)
                // _.each(Goods.product.products, function(elem){
                //     //elem.productID = elem.uuid;
                //     console.log(elem);
                // })
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