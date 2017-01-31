angular.module('app')
    .component('productDetail', {
        templateUrl: "components/common/product-detail.html",
        controller: ['$rootScope', '$location','Cart', 'Category', 'Product', '$q', '$timeout', '$cookies', function ($rootScope, $location, Cart, Category, Product, $q, $timeout, $cookies) {
            var self = this;
            self.cart = Cart;
            //console.log($location.url().split('/').pop());
            self.Product = Product;
            self.curProdCheck = {};
            self.mesSuc = false;
            self.mesWar = false;
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
            self.valueChecked = function(){
                for (var i = 0; i<self.curProdCheck.combo.length;i++){
                    console.log(self.curProdCheck.combo[i]);
                    if(self.curProdCheck.combo[i].val==null){
                        self.mesWar = true;
                        self.mesSuc = false;
                        return
                    }
                }
                console.log(self.curProdCheck);
                self.cart.save(self.curProdCheck);
                self.mesWar = false;
                self.mesSuc = true;
                return
            };
            self.$onInit = function() {
                var self = this;
                console.log(self.Product.curProd);

                self.curProdCheck = {
                    name: self.Product.curProd.name,
                    article: self.Product.curProd.article,
                    price: self.Product.curProd.price,
                    currency: self.Product.curProd.currency,
                    uuid: self.Product.curProd.uuid,
                    description: self.Product.curProd.description,
                    photo: self.Product.curProd.photo.uuid,
                    combo: []
                };
                for (var i=0; i<self.Product.curProd.combo.length;i++) {
                    self.curProdCheck.combo.push({
                        name: self.Product.curProd.combo[i].name,
                        slug: self.Product.curProd.combo[i].slug,
                        val: null
                    });
                }
            }
        }]
    });