angular.module('app')
    .controller('replaceToCart', ['$uibModalInstance', '$scope', 'modalData', 'Cart', 'DeferredService',  function ($uibModalInstance, $scope, modalData, Cart, DeferredService) {
        $scope.Cart = Cart;

        $scope.curProd = angular.copy(modalData.defProd);
        $scope.curProd.product = $scope.curProd.uuid;
        $scope.curProd.count = 1;

        $scope.combos = [];
        for (var i=0; i<$scope.curProd.combo.length;i++) {
            $scope.combos.push({
                name: $scope.curProd.combo[i].name,
                slug: $scope.curProd.combo[i].slug,
                values: $scope.curProd.combo[i].values[0]
            });
        }

        $scope.error = null;

        $scope.change = function(){
            // $scope.Cart.replace($scope.curProd, $scope.curProdCheck);
            DeferredService.remove($scope.curProd, function (err) {
                if (err) return console.error('can\'t remove from deferred', err);

                Cart.add($scope.curProd, $scope.combos, function (err) {
                    if (err) return console.error('can\'t add to cart', err);

                    $uibModalInstance.dismiss();
                })
            })
        };
        $scope.close = function () {
            $uibModalInstance.dismiss();
        }
    }]);