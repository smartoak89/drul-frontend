angular.module('app')
    .controller('product', ['$rootScope', '$scope', '$uibModalInstance', 'Cart', 'modalData', 'Category',
        function ($rootScope, $scope, $uibModalInstance, Cart, modalData, Category) {
            $rootScope.$broadcast('modalOpened');
            $scope.product = modalData.product;
            $scope.config = {
                zoomLevels: 3,
                neutralZoomLevel:0,
                zoomToFitZoomLevelFactor:1,
                initialPanX:-300,
                initialPanY:-300};
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