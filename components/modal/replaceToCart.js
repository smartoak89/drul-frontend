angular.module('app')
    .controller('replaceToCart', ['$uibModalInstance', '$scope', 'User', 'modalData', 'Cart',  function ($uibModalInstance, $scope, User, modalData, Cart) {
        $scope.User = User;
        $scope.Cart = Cart;
        console.log(modalData);
        $scope.curProd = angular.copy(modalData.defProd);
        console.log($scope.curProd);
        $scope.curProd.count = 1;

        $scope.curProdCheck = {
            image: $scope.curProd.photo.uuid,
            counter: 1,
            combo: []
        };
        for (var i=0; i<$scope.curProd.combo.length;i++) {
            $scope.curProdCheck.combo.push({
                name: $scope.curProd.combo[i].name,
                slug: $scope.curProd.combo[i].slug,
                val: null
            });
        }

        $scope.error = null;
        //$scope.countPlus = function(){
        //    $scope.curProd.count++;
        //};
        //$scope.countMinus = function(){
        //    $scope.curProd.count--;
        //    $scope.checkMinus();
        //};
        //$scope.checkMinus = function(){
        //    if($scope.curProd.count < 1) {
        //        $scope.curProd.count = 1;
        //    }
        //};
        $scope.change = function(){
            $scope.curProdCheck.counter = $scope.curProd.count;
            $scope.Cart.replace($scope.curProd, $scope.curProdCheck);
            $uibModalInstance.dismiss();
        }
        $scope.close = function () {
            $uibModalInstance.dismiss();
        }
    }]);