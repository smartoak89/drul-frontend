angular.module('app')
    .controller('product', ['$scope', '$uibModalInstance', 'Cart', 'modalData','Category', function ($scope, $uibModalInstance, Cart, modalData, Category) {
        $scope.product = modalData.product;
        $scope.categories = Category.category;
        Category.getList().then(function(res){
            $scope.categories = Category.category;
            $scope.curCateg = _.find($scope.categories, {slug: $scope.product.category})
            console.log($scope.curCateg);
        });
        $scope.curCateg = _.find($scope.categories, {slug: $scope.product.category})
        console.log($scope.curCateg);
        $scope.addToDeferred = function () {
            Cart.addToDeferred($scope.product);
        };

        $scope.close = function () {
            $uibModalInstance.dismiss();
        }
    }]);