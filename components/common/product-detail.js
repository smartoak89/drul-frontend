angular.module('app')
    .component('productDetail', {
        templateUrl: "components/common/product-detail.html",
        controller: ['$rootScope', '$location','Cart', 'Category', 'Product', '$q', '$timeout', '$cookies', 'User', 'ReviewsService', function ($rootScope, $location, Cart, Category, Product, $q, $timeout, $cookies, User, ReviewsService) {
            var self = this;
            self.cart = Cart;
            self.user = User;
            console.log(self.user);
            self.Product = Product;
            self.curProdCheck = {};
            self.mesSuc = false;
            self.mesWar = false;
            self.error = {};
            self.message = {};
            self.commBody = {
                body: null
            };
            self.$onInit = function() {
                var self = this;
                self.admin = User.active.permission == 'administrator' ? true : false;
                if(self.Product.products === null){
                    self.Product.getCurProd($location.url().split('/').pop()).then(function(){
                        self.Product.changeCurrency([self.Product.curProd]).then(function(){
                            self.Product.countStock(self.Product.curProd).then(function(){

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
                        accessFormReviews();
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
                    accessFormReviews();
                }

            };
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
            self.sendComm = function(){
                if(!self.commBody.body || self.commBody.body.length < 4) return self.error.reviews = 'Текст отзыва должен быть не мение чем 4 символа!';
                self.error.reviews = null;

                ReviewsService.addReviews(self.Product.curProd.uuid, self.commBody, function (err, res) {
                   if (err) return self.error.reviews = err.data.message;
                    self.commBody.body = '';
                    self.Product.curProd.comments.push(res);
                    self.message.reviews = 'Отзыв будет опубликован после проверки администратором!';
                })
            };
            function accessFormReviews() {
                ReviewsService.accessFormReviews(self.Product.curProd.uuid, function (access) {
                    self.accessFormReview = access;
                })
            };

            $rootScope.$on('reviewRemoved', function (event, reviewId) {
                _.remove(self.Product.curProd.comments, {uuid: reviewId});
            })

            $rootScope.$on('reviewPublished', function (event, reviewId) {
                _.find(self.Product.curProd.comments, {uuid: reviewId}).publish = true;
            })

        }]
    });