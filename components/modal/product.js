angular.module('app')
    .controller('product', ['$rootScope', '$scope', '$uibModalInstance', 'Cart', 'modalData', 'Category',
        function ($rootScope, $scope, $uibModalInstance, Cart, modalData, Category) {
            $rootScope.$broadcast('modalOpened');
            $scope.product = modalData.product;
            $scope.config = {neutralZoomLevel: 1};
            $scope.model = {};
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