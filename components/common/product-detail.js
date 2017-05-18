angular.module('app')
    .component('productDetail', {
        templateUrl: "components/common/product-detail.html",

        controller: ['$rootScope', '$location','Cart', 'Product', 'User', 'Conf', 'DeferredService', '$timeout', 'FileService', 'CurrencyService', '$uibModal',
            function ($rootScope, $location, Cart, Product, User, Conf, DeferredService, $timeout, FileService, CurrencyService, $uibModal) {
            var self = this;
            self.cart = Cart;
            self.user = User.get();
            self.Conf = Conf;
            self.Product = Product;
            self.currencyService = CurrencyService;
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

                self.addToDeferred = function () {
                    DeferredService.add(self.product, function () {});
                };

                self.delFromDeferred = function () {
                    DeferredService.remove(self.product, function () {})
                };

                self.setActiveImageInGallery = function (prop, img) { self[prop] = img; };

                self.initImg = function(){
                    self.setActiveImageInGallery('zoomModelGallery01', self.product.photo.uuid)
                };

                self.$onDestroy = function() { $('.zoomContainer').remove(); };

                self.buyNow = function (e) {

                    if (choosedCombo < self.product.combo) {
                        return showMsg('warning', 'Не все опции выбраны!');
                    }

                    openModalBuyNow();
                };

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
                        FileService.listGallery(product);
                        CurrencyService.changePrice(product);

                        self.product = product;
                        console.log('product', self.product)
                    })
                }

                self.categoryLink = function(ind) {
                    var category = self.product.category;

                    if (self.product && category.slug) {
                        return category.slug.filter(function (c, i) {
                            if (ind >= i) return c;
                        }).join('/')
                        // console.log(self.product.category.slug[ind]);
                    }
                };

                $rootScope.$on('currencyChanged', function () {
                    CurrencyService.changePrice(self.product);
                });
                function openModalBuyNow () {
                    var product = angular.copy(self.product);
                    product.combo = choosedCombo;

                    $uibModal.open({
                        templateUrl: 'components/modal/buy-now.html',
                        controller: 'buyNow',
                        size: 'buy-now',
                        resolve: {
                            product: product
                        }
                    });
                }

            }]
    });