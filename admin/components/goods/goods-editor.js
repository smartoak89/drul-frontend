angular.module('admin')
    .component('goodsEditor', {
    templateUrl: "admin/components/goods/goods-editor.html",
    controller: ['Goods', 'FileUploader', 'Conf', 'File', 'Categories', '$state', 'Stocks', '$q', '$location', 'User',
        function (Goods, FileUploader, Conf, File, Categories, $state, Stocks, $q, $location, User) {
            var self = this;
            // this.editMode = true;
            this.product = Goods.editprod;
            this.pror = {};
            this.categoryArticle;
            self.Conf = Conf;
            self.viewComments = false;

            this.$onInit = function () {
                Categories.list(function (categories) {
                    self.categories = categories;
                });
                Goods.listComb(function (combinations) {
                    self.combinations = combinations;
                });
                Goods.getCom(self.product);
                Stocks.list(function (stocks) {
                    self.stocks = stocks;
                    if (self.product.stock){
                        self.currentStock = _.find(Stocks.stocksList, {uuid: self.product.stock.stock_id});
                        // self.applyStock();
                    }
                });
                //if(self.product.article)
                //    self.product.article = self.product.article.split('_').pop();
            };
            self.descriptionCange = function () {
                console.log(self.product.description)
            }
            this.searchCurrentCategory = function () {

                var category = _.find(self.categories, {slug: self.product.category.slug[0]});
                if (category) {
                    self.categoryArticle = category.article.toLowerCase();
                } else {
                    _.each(self.categories, function (elem) {
                        // elem.show = false;
                        if (elem.children.length > 0) {
                            var subcat = _.find(elem.children, {slug: self.product.category.slug[0]});
                            if (subcat) {
                                // elem.show = true;
                                self.categoryArticle = subcat.article.toLowerCase();
                                category = subcat;
                            }
                        }
                    });
                }
                return category;
            };

            this.findComboModel = function (name, slug) {
                var index = _.findIndex(self.product.combo, {name: name});
                if (index === -1) {
                    index = self.product.combo.length;
                    self.product.combo[index] = {name: name};
                    self.product.combo[index]['slug'] = slug;
                }
                return index;
            };


            this.remove = function (file) {
                File.remove(file.uuid, function (err, res) {
                    if (err) return self.error = err;
                    if (file.type == 'main') {
                        self.product.photo = null;
                    }
                    _.remove(self.product.gallery, file);
                })
            };

            this.applyStock = function () {
                if (!self.currentStock && self.product.stock) {
                    self.product.price = self.product.stock.old_price;
                    delete self.product.stock;
                    // self.product.stock = {};
                    return;
                }
                self.product.stock = {
                    stock_id: self.currentStock.uuid,
                    old_price: self.product.price
                };
                applyStock(self.product);
            };

            this.addCategory = function (category, parent) {

                this.product.category = {
                    name: [],
                    slug: []
                };

                this.product.category.name[0] = category.name;
                this.product.category.slug[0] = category.slug;

                if (parent) {
                    this.product.category.name[1] = parent.name;
                    this.product.category.slug[1] = parent.slug;

                }

            };

            this.edit = function () {
                self.editMode = !self.editMode;
            };

            this.delCombo = function (name) {
                _.remove(self.product.combo, {name: name});
            };

            this.save = function () {
                if (isValid() !== true) return;
                //changeArticle();
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
                }
            };
            this.chooseMain = function (index) {
                angular.forEach(uploader.queue, function (i, ind) {
                    i.alias = (ind === index) ? 'main' : 'gallery';
                });
            };

            function applyStock (product){
                var stock = _.find(Stocks.stocksList, {uuid: product.stock.stock_id});
                product.price = Math.round(product.stock.old_price - ( product.stock.old_price * stock.percent / 100 ));
            }

            //function changeArticle () {
            //    self.product.article = self.categoryArticle.toLowerCase() + '_' + self.product.article.split('_').pop();
            //}
            function updateProduct () {
                Goods.update(self.product, function (err, res) {
                    if (err) return self.error = err.message;
                    Goods.getGallery(res);
                    Goods.editprod = res;
                    self.editMode = false;
                    $state.go('admin.goodsAdmin');
                });
            }

            // Uploader
            var uploader = this.uploader = new FileUploader({
                url: Conf.api_path + '/file/product/' + Goods.editprod.uuid,
                headers: {Authorization: User.token()}
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
                //if (!p.article) return self.error = 'Введите артикль товара !';
                if (!p.category) return self.error = 'Выберите категорию товара !';
                if (!p.price) return self.error = 'Введите цену товара !';
                if (!p.gallery && self.uploader.queue.length == 0) return self.error = 'Загрузите изображение для товара !';
                p.show = true;
                self.error = null;
                return true;
            }


        }]
});