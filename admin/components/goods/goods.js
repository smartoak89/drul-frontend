angular.module('admin')
    .component('goods', {
        templateUrl: "admin/components/goods/goods.html",
        controller: ['Goods', '$q', '$location', function (Goods, $q, $location) {
            var self = this;
            this.products = Goods.list();
            console.log('Products', this.products);
            self.prodService = Goods;
            self.removeProd = function (obj, index) {
                self.prodService.product = obj;
                self.prodService.productIndex = index;
            };
            this.edit = function (product) {
                Goods.editLocal(product);
            }
        }]
    })

    .component('goodsEditor', {
        templateUrl: "admin/components/goods/goods-editor.html",
        controller: ['Goods', 'FileUploader', 'Conf', 'File', 'Categories', '$state', 'Stocks', '$q', '$location',
            function (Goods, FileUploader, Conf, File, Categories, $state, Stocks, $q, $location) {
                var self = this;
                // this.editMode = true;
                this.product = Goods.editprod;
                this.pror = {};
                this.categoryArticle;
                this.$onInit = function () {
                    console.log('Product => ', self.product);
                    Categories.list(function (categories) {
                        self.categories = categories;
                    });
                    Goods.listComb(function (combinations) {
                        self.combinations = combinations;
                    });
                    Stocks.list(function (stocks) {
                        self.stocks = stocks;
                        if (self.product.stock){
                            console.log('balbalba')
                            self.currentStock = _.find(Stocks.stocksList, {uuid: self.product.stock});
                            self.applyStock();
                        }
                    });
                    if(self.product.article)
                        self.product.article = self.product.article.split('_').pop();
                };
                this.show = function () {
                    console.info('Product => ', self.product);
                    changeArticle ()
                };

                this.searchCurrentCategory = function () {

                    var category = _.find(self.categories, {slug: self.product.category.slug});
                    if (category) {
                        self.categoryArticle = category.article;
                    } else {
                        _.each(self.categories, function (elem) {
                            // elem.show = false;
                            if (elem.children.length > 0) {
                                var subcat = _.find(elem.children, {slug: self.product.category.slug});
                                if (subcat) {
                                    // elem.show = true;
                                    self.categoryArticle = subcat.article;
                                    category = subcat;
                                }
                            }
                        });
                    }
                    return category;
                };

                this.findComboModel = function (name) {
                    var index = _.findIndex(self.product.combo, {name: name});
                    if (index === -1) {
                        index = self.product.combo.length;
                        self.product.combo[index] = {name: name};
                    }
                    return index;
                };


                this.remove = function (file) {
                    File.remove(file.uuid, function (err, res) {
                        if (err) return self.error = err;
                        console.info('file was removed', res);
                        if (file.type == 'main') {
                            console.log('type, main');
                            self.product.photo = null;
                        }
                        _.remove(self.product.gallery, file);
                    })
                };

                this.applyStock = function () {
                    if (!self.currentStock) {
                        self.product.stock = '';
                        delete self.product.stockCost;
                        return;
                    }
                    self.product.stock = self.currentStock.uuid;
                    Goods.applyStock(self.product);
                };

                this.addCategory = function (category) {
                    this.product.category = {
                        name: category.name,
                        slug: category.slug
                    };
                };

                this.edit = function () {
                    self.editMode = !self.editMode;
                };

                this.delCombo = function (name) {
                    _.remove(self.product.combo, {name: name});
                };

                this.save = function () {
                    if (isValid() !== true) return;
                    changeArticle();
                    delete self.product.gallery;
                    if (uploader.queue.length > 0) {
                        self.uploading = true;
                        return uploader.uploadAll();
                    }
                    updateProduct()
                };

                this.addSub = function (n, v) {
                    if (n && v) {
                        if (!self.product.sublines) {
                            self.product.sublines = [];
                        }
                        self.product.sublines.push({name: n, value: v})
                        console.log(self.product);
                    }
                };
                this.chooseMain = function (index) {
                    angular.forEach(uploader.queue, function (i, ind) {
                        i.alias = (ind === index) ? 'main' : 'gallery';
                    });
                };
                function changeArticle () {
                    self.product.article = self.categoryArticle + '_' + self.product.article.split('_').pop();
                }
                function updateProduct () {
                    Goods.update(self.product, function (err, res) {
                        if (err) return self.error = err.message;
                        console.info('saved', res);
                        Goods.getGallery(res);
                        self.product = res;
                        self.editMode = false;
                        $state.go('admin.goodsAdmin');
                    });
                }

                // Uploader
                var uploader = this.uploader = new FileUploader({
                    url: Conf.api_path + '/file/' + Goods.editprod.uuid
                });
                uploader.onAfterAddingAll = function () {
                    self.addingGallery = true;
                    if (!self.product.photo) {
                        uploader.queue[0].alias = 'main'
                    }
                };
                uploader.onCompleteAll = function () {
                    updateProduct();
                    self.editMode = false;
                };

                function isValid() {
                    var p = self.product;
                    if (!p.name) return self.error = 'Введите название товара !';
                    if (!p.article) return self.error = 'Введите артикль товара !';
                    if (!p.category) return self.error = 'Выберите категорию товара !';
                    if (!p.price) return self.error = 'Введите цену товара !';
                    if (!p.gallery && self.uploader.queue.length == 0) return self.error = 'Загрузите изображение для товара !';
                    p.show = true;
                    self.error = null;
                    return true;
                }


            }]
    });
// $q.all([Categories.list(), Goods.listComb(), Stocks.list()]).then(function(){
//     self.categories = Categories.categories;
//     self.combinations = Goods.combinations;
//     self.stocks = Stocks.stocksList;
//     if(self.product.stock != null){
//         self.curStock = _.find(self.stocks, {uuid: self.product.stock});
//         self.stockFun(self.curStock.percent, self.product.price);
//
//     }else{
//         self.curStock = null;
//     }
// });

// if(this.product.stock){
//    self.stocks = Stocks.stocksList;
//    self.curStock = _.find(self.stocks, {uuid: self.product.stock});
//    self.stockFun(self.curStock.percent, self.product.price);
// }else{
//    self.curStock = null;
// }
// console.log(this.categories[1].children[0]);
// console.log(_(this.categories).thru(function(coll) {return _.union(coll, _.map(coll, 'children'))}).flatten())

// this.$onInit = function () {
//     getGallery ();
//     if (self.product && !self.product.article) {
//         // self.categArticle = _.find(self.categories, {slug: self.product.category});
//         // self.product.article = categArticle + '.';
//     }
// };

// function getGallery () {
//     Goods.getGallery(self.product, function (err) {
//         if (err) console.trace('error', err);
//     });
// }