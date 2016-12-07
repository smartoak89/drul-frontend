angular.module('app')
    .component('productDetail', {
        templateUrl: "components/common/product-detail.html",
        controller: ['$rootScope', '$location','Cart', 'Category', 'Product', '$q', function ($rootScope, $location, Cart, Category, Product, $q) {
            var self = this;
            console.log($location.url().split('/').pop());
            self.Product = Product;
            if(self.Product.products === null){
                self.Product.getCurProd($location.url().split('/').pop()).then(function(){
                    console.log(self.Product.curProd);
                    self.product = self.Product.curProd;
                });
            }else{
                self.product = _.find(self.Product.products, {uuid: $location.url().split('/').pop()});
                console.log(self.product);
            }
            self.url = '<img id="zoom_01" class="img-responsive" src="/api/file/5a0518ab-9b5f-4af8-830f-8873bdac2509" data-zoom-image="http://95.46.99.177/api/file/5a0518ab-9b5f-4af8-830f-8873bdac2509"/>'
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