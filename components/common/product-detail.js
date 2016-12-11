angular.module('app')
    .component('productDetail', {
        templateUrl: "components/common/product-detail.html",
        controller: ['$rootScope', '$location','Cart', 'Category', 'Product', '$q', '$timeout', '$cookies', function ($rootScope, $location, Cart, Category, Product, $q, $timeout, $cookies) {
            var self = this;
            self.cart = Cart;
            //console.log($location.url().split('/').pop());
            self.Product = Product;
            if(self.Product.products === null){
                self.Product.getCurProd($location.url().split('/').pop()).then(function(){
                    self.Product.changeCurrency([self.Product.curProd]).then(function(){
                        self.Product.countStock(self.Product.curProd).then(function(){
                            console.log(self.Product.curProd);
                        })
                    });

                    self.Product.curProd.currency = $cookies.get('currency');
                });
            }else{
                self.Product.curProd = _.find(self.Product.products, {uuid: $location.url().split('/').pop()});
                self.Product.curProd.currency = $cookies.get('currency');
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
                self.setActiveImageInGallery('zoomModelGallery01', self.Product.curProd.photo.uuid)
            };

            self.$onDestroy = function() {
                $('.zoomContainer').remove();
            };
        }]
    });