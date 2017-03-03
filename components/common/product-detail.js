angular.module('app')
    .component('productDetail', {
        templateUrl: "components/common/product-detail.html",

        controller: ['$location','Cart', 'Category', 'Product', 'User', 'Conf', 'DeferredService', '$timeout',
            function ($location, Cart, Category, Product, User, Conf, DeferredService, $timeout) {
            var self = this;
            self.cart = Cart;
            self.user = User.get();
            self.Conf = Conf;
            self.Product = Product;
            self.curProdCheck = {};
            self.error = {};

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
                self.message = {};

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
                var choosedCombo = [];

                self.chooseCombo = function (index, combo, value) {
                    choosedCombo[index] = {
                        name: combo.name,
                        slug: combo.slug,
                        value: value
                    }
                };

                self.addToCart = function () {
                    if (choosedCombo < self.product.combo) return showMsg('warning', 'Не все опции выбраны!');

                    Cart.add(self.product, choosedCombo, function (err, res) {
                        if (err) return showMsg('warning', 'Произошла ошибка при добавление товара в корзину!');
                        showMsg('success', 'Товар добавлен в корзину!');
                    });
                };

                self.setActiveImageInGallery = function (prop, img) { self[prop] = img; };

                self.initImg = function(){
                    self.setActiveImageInGallery('zoomModelGallery01', self.product.photo.uuid)
                };

                self.$onDestroy = function() { $('.zoomContainer').remove(); };

                function showMsg (type, msg) {
                    self.message.type = type;
                    self.message.msg = msg;

                    $timeout(function () {
                        self.message = {};
                    }, 2000)
                }

                function getProduct() {
                    var id = $location.url().split('/').pop();

                    Product.getProduct(id, function (product) {
                        DeferredService.wasDeferred(product);

                        self.product = product;
                    })
                }

            }]
    });