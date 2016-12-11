angular.module('app')
    .component('productDetail', {
        templateUrl: "components/common/product-detail.html",
        controller: ['$rootScope', '$location','Cart', 'Category', 'Product', '$q', '$timeout', function ($rootScope, $location, Cart, Category, Product, $q, $timeout) {
            var self = this;
            self.cart = Cart;
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
            //self.mainPhoto = function(photo){
            //    console.log(photo);
            //    self.product.photo = photo;
            //}
            self.zoomOptionsGallery01 = {
                scrollZoom: false,
                zoomWindowWidth: 400,
                zoomWindowHeight: 400,

                gallery: 'gallery_01',
                cursor: 'pointer',
                imageCrossfade: true,
                loadingIcon: false
            };
            self.setActiveImageInGallery = function (prop, img) {
                self[prop] = img;
            };
            self.model = {};
            self.config = {
                zoomLevels: 3,
                neutralZoomLevel:0,
                zoomToFitZoomLevelFactor:1,
                initialPanX:-300,
                initialPanY:-300,
                disableZoomAnimation: false
            };
            self.initImg = function(){
                self.setActiveImageInGallery('zoomModelGallery01', self.product.photo.uuid)
            };

            self.$onDestroy = function() {
                $('.zoomContainer').remove();
            };
        }]
    });