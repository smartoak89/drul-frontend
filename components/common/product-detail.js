angular.module('app')
    .component('productDetail', {
        templateUrl: "components/common/product-detail.html",
        controller: ['$rootScope', '$location','Cart', 'Category', 'Product', '$q', '$timeout', '$cookies', 'User', function ($rootScope, $location, Cart, Category, Product, $q, $timeout, $cookies, User) {
            var self = this;
            self.cart = Cart;
            self.user = User;
            console.log(self.user);
            self.Product = Product;
            self.curProdCheck = {};
            self.mesSuc = false;
            self.mesWar = false;
            self.commBody = {
                body: null
            };
            if(self.Product.products === null){
                self.Product.getCurProd($location.url().split('/').pop()).then(function(){
                    self.Product.changeCurrency([self.Product.curProd]).then(function(){
                        self.Product.countStock(self.Product.curProd).then(function(){
                            console.log(self.Product.curProd);

                        })
                        self.curProdCheck = {
                            image: self.Product.curProd.photo.uuid,
                            combo: []
                        };
                        for (var i=0; i<self.Product.curProd.combo.length;i++) {
                            self.curProdCheck.combo.push({
                                name: self.Product.curProd.combo[i].name,
                                slug: self.Product.curProd.combo[i].slug,
                                val: null
                            });
                        }
                    });

                    self.Product.curProd.currency = $cookies.get('currency');
                });
            }else{
                self.Product.curProd = _.find(self.Product.products, {uuid: $location.url().split('/').pop()});
                self.Product.curProd.currency = $cookies.get('currency');
                self.curProdCheck = {
                    image: self.Product.curProd.photo.uuid,
                    counter: 1,
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
                    if(self.curProdCheck.combo[i].val==null){
                        self.mesWar = true;
                        self.mesSuc = false;
                        return
                    }
                }
                console.log(self.curProdCheck);
                console.log(angular.isArray(self.cart.cartList));
                if(self.user.active == null && self.cart.cartList == null){
                    self.curProdCheck.name = self.Product.curProd.name;
                    self.curProdCheck.article = self.Product.curProd.article;
                    self.curProdCheck.price = self.Product.curProd.price;
                    self.curProdCheck.uuid = self.Product.curProd.uuid;
                    self.curProdCheck.currency = self.Product.curProd.currency;
                    self.cart.cartList = [];
                    self.cart.cartList.push(self.curProdCheck);
                }else if(self.user.active == null && angular.isArray(self.cart.cartList)){
                    self.curProdCheck.name = self.Product.curProd.name;
                    self.curProdCheck.article = self.Product.curProd.article;
                    self.curProdCheck.price = self.Product.curProd.price;
                    self.curProdCheck.uuid = self.Product.curProd.uuid;
                    self.curProdCheck.currency = self.Product.curProd.currency;
                    self.cart.cartList.push(self.curProdCheck);
                }else{
                    self.cart.save(self.Product.curProd, self.curProdCheck);
                }
                self.mesWar = false;
                self.mesSuc = true;
                return
            };
            //self.sendComm = function(){
            //    if(self.commBody.body){
            //        self.Product.saveCom(self.commBody, self.Product.curProd, self.user.active)
            //    }else{
            //        self.sendCommError = true
            //    }
            //};
            self.$onInit = function() {
                var self = this;
                console.log(self.Product.curProd);


            }
        }]
    });