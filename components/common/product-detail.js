angular.module('app')
    .component('productDetail', {
        templateUrl: "components/common/product-detail.html",
        controller: ['$rootScope', '$location','Cart', 'Category', 'Product', '$q', '$timeout', '$cookies', 'User', 'Conf',
            function ($rootScope, $location, Cart, Category, Product, $q, $timeout, $cookies, User, Conf) {
            var self = this;
            self.cart = Cart;
            self.user = User.get();
            self.Conf = Conf;
<<<<<<< HEAD
            console.log(self.user);
=======

>>>>>>> d70e2c72df128464105e9145117cc2c95b0b86a5
            self.Product = Product;
            self.curProdCheck = {};
            self.error = {};
<<<<<<< HEAD
            self.message = {};
            self.commBody = {
                body: null
            };
            self.$onInit = function() {
                var self = this;
                if (self.user) self.admin = self.user.permission == 'administrator' ? true : false;
                if(self.Product.products.length == 0){
                    console.log('+')
                    self.Product.getCurProd($location.url().split('/').pop()).then(function(){
                        self.Product.changeCurrency([self.Product.curProd]).then(function(){
                            self.Product.countStock(self.Product.curProd).then(function(){

                            });

                            if(_.find(self.cart.defList, {uuid: self.Product.curProd.uuid})){
                                self.Product.curProd.def = true;
                            }else{
                                self.Product.curProd.def = false;
                            }
                            if(self.Product.curProd.photo){
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
                            }

                        });

                        self.Product.curProd.currency = $cookies.get('currency');
                        if (self.user) accessFormReviews();
                    });
                }else{
                    self.Product.curProd = _.find(self.Product.products, {uuid: $location.url().split('/').pop()});
                    console.log(self.Product.curProd);
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
                    if (self.user) accessFormReviews();
                }

            };
=======

>>>>>>> d70e2c72df128464105e9145117cc2c95b0b86a5
            self.zoomOptionsGallery01 = {
                    scrollZoom: false,
                    zoomWindowWidth: 400,
                    zoomWindowHeight: 400,

                    gallery: 'gallery_01',
                    cursor: 'pointer',
                    imageCrossfade: true,
                    loadingIcon: false
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

            self.$onInit = function() {

                getProduct();

                // if(self.Product.products === null){
                //
                //     if(self.Product.products.length == 0) {
                //         // self.Product.getCurProd($location.url().split('/').pop()).then(function () {
                //         //
                //         //     self.Product.changeCurrency([self.Product.curProd]).then(function () {
                //         //
                //         //         if (_.find(self.cart.defList, {uuid: self.Product.curProd.uuid})) {
                //         //             self.Product.curProd.def = true;
                //         //         } else {
                //         //             self.Product.curProd.def = false;
                //         //         }
                //         //         if (self.Product.curProd.photo) {
                //         //             self.curProdCheck = {
                //         //                 image: self.Product.curProd.photo.uuid,
                //         //                 combo: []
                //         //             };
                //         //             for (var i = 0; i < self.Product.curProd.combo.length; i++) {
                //         //                 self.curProdCheck.combo.push({
                //         //                     name: self.Product.curProd.combo[i].name,
                //         //                     slug: self.Product.curProd.combo[i].slug,
                //         //                     val: null
                //         //                 });
                //         //             }
                //         //         }
                //         //
                //         //     });
                //         // });
                //     }
                //
                // }else{
                //     self.Product.curProd = _.find(self.Product.products, {uuid: $location.url().split('/').pop()});
                //
                //     self.curProdCheck = {
                //         image: self.Product.curProd.photo.uuid,
                //         counter: 1,
                //         combo: []
                //     };
                //
                //     for (var i=0; i<self.Product.curProd.combo.length;i++) {
                //         self.curProdCheck.combo.push({
                //             name: self.Product.curProd.combo[i].name,
                //             slug: self.Product.curProd.combo[i].slug,
                //             val: null
                //         });
                //     }
                // }

            };
<<<<<<< HEAD
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
                if(self.user == null && self.cart.cartList == null){
                    self.curProdCheck.name = self.Product.curProd.name;
                    self.curProdCheck.article = self.Product.curProd.article;
                    self.curProdCheck.price = self.Product.curProd.price;
                    self.curProdCheck.uuid = self.Product.curProd.uuid;
                    self.curProdCheck.currency = self.Product.curProd.currency;
                    self.cart.cartList = [];
                    self.cart.cartList.push(self.curProdCheck);
                }else if(self.user == null && angular.isArray(self.cart.cartList)){
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
=======

            self.setActiveImageInGallery = function (prop, img) {
                self[prop] = img;
>>>>>>> d70e2c72df128464105e9145117cc2c95b0b86a5
            };

            self.initImg = function(){
                self.setActiveImageInGallery('zoomModelGallery01', self.product.photo.uuid)
            };

            function getProduct() {
                var id = $location.url().split('/').pop();

                Product.getProduct(id, function (product) {
                    self.product = product;
                })
            }

            // self.valueChecked = function(){
            //     for (var i = 0; i < self.curProdCheck.combo.length; i++){
            //         if(self.curProdCheck.combo[i].val==null){
            //             self.mesWar = true;
            //             self.mesSuc = false;
            //             return
            //         }
            //     }
            //
            //     if(self.user == null && self.cart.cartList == null){
            //         self.curProdCheck.name = self.Product.curProd.name;
            //         self.curProdCheck.article = self.Product.curProd.article;
            //         self.curProdCheck.price = self.Product.curProd.price;
            //         self.curProdCheck.uuid = self.Product.curProd.uuid;
            //         self.curProdCheck.currency = self.Product.curProd.currency;
            //         self.curProdCheck.stock = self.Product.curProd.stock;
            //         self.cart.cartList = [];
            //         self.cart.cartList.push(self.curProdCheck);
            //     }else if(self.user == null && angular.isArray(self.cart.cartList)){
            //         self.curProdCheck.name = self.Product.curProd.name;
            //         self.curProdCheck.article = self.Product.curProd.article;
            //         self.curProdCheck.price = self.Product.curProd.price;
            //         self.curProdCheck.uuid = self.Product.curProd.uuid;
            //         self.curProdCheck.currency = self.Product.curProd.currency;
            //         self.curProdCheck.stock = self.Product.curProd.stock;
            //         self.cart.cartList.push(self.curProdCheck);
            //     }else{
            //         self.cart.save(self.Product.curProd, self.curProdCheck);
            //     }
            //
            //     self.mesWar = false;
            //     self.mesSuc = true;
            //
            //     return
            // };

            self.$onDestroy = function() {
                $('.zoomContainer').remove();
            };

        }]
    });