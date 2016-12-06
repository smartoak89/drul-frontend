angular.module('app')
    .component('productDetail', {
        templateUrl: "components/common/product-detail.html",
        bindings: {
            product: '='
        },
        controller: ['$rootScope', '$location','Cart', 'Category', function ($rootScope, $location, Cart, Category) {
            var self = this;
            console.log(this.product)
            self.model = {};
            self.config = {
                zoomLevels: 3,
                neutralZoomLevel:0,
                zoomToFitZoomLevelFactor:1,
                initialPanX:-300,
                initialPanY:-300,
                disableZoomAnimation: false
            };
        }]
    });