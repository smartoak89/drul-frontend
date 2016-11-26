angular.module('app')
    .controller('product', ['$rootScope', '$scope', '$uibModalInstance', 'Cart', 'modalData', 'Category',
        function ($rootScope, $scope, $uibModalInstance, Cart, modalData, Category) {
            $rootScope.$broadcast('modalOpened');
            $scope.product = modalData.product;
            // $scope.categories = Category.category;
            // Category.getList().then(function(res){
            //     $scope.categories = Category.category;
            //     $scope.curCateg = _.find($scope.categories, {slug: $scope.product.category})
            //     console.log($scope.curCateg);
            // });
            // $scope.curCateg = _.find($scope.categories, {slug: $scope.product.category})
            // console.log($scope.curCateg);
            $scope.addToDeferred = function () {
                Cart.addToDeferred($scope.product);
            };
            console.log('Product => ', $scope.product);
            $scope.close = function () {
                $uibModalInstance.dismiss();
            };
            $scope.$on('$destroy', function () {
                $rootScope.$broadcast('modalClosed');
            })
        }]);