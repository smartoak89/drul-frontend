angular.module('admin')
    .component('goods', {
        templateUrl: "admin/components/goods/goods.html",
        controller: ['Goods',function(Goods) {
            var self = this;
            this.products = Goods.list();
            console.log('Products', this.products);
            self.prodService = Goods;
            self.removeProd = function(obj, index){
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
        controller: ['Goods', 'FileUploader', 'Conf', 'File', 'Categories', function(Goods, FileUploader, Conf, File, Categories) {
            var self = this;
            this.categories = Categories.list();
            this.editMode = false;
            this.product = Goods.editprod;
            this.preview = this.product.photo;
            this.range = [35,36,37,38,39,40,41,42,43,44,45,46];

            this.$onInit = function () {
                if (self.product && !self.product.article) {
                    // self.categArticle = _.find(self.categories, {slug: self.product.category});
                    // self.product.article = categArticle + '.';
                }
            };

            this.remove = function (file) {
                File.remove(file.uuid, function (err, res) {
                    if (err) return self.error = err;
                    console.info('file was removed', res);
                    _.remove(self.product.gallery, file);
                })
            };

            this.addCategToProduct = function (category) {
                this.product.category = category.slug;
                // self.categArticle.article = category.article;
            };

            // Uploader
            var uploader = this.uploader = new FileUploader({
                url: Conf.api_path + '/file/' + Goods.editprod.uuid
            });

            uploader.onAfterAddingAll = function() {
                self.addingGallery = true;
                if (!self.product.photo) {
                    uploader.queue[0].alias = 'main'
                }
            };

            this.edit = function () {
                self.editMode = true;
            };

            this.save = function () {
                Goods.update(self.product, function (err, res) {
                    if (err) return self.error = err;

                    if (uploader.queue.length > 0) {
                        return uploader.uploadAll();
                    }
                    console.info('Update product => ', res);
                    self.editMode = false;
                });

            };
            uploader.onCompleteAll = function() {
                self.editMode = false;
            };
            this.chooseMain = function (index) {
                angular.forEach(uploader.queue, function (i, ind) {
                    i.alias = (ind === index) ? 'main' : 'gallery';
                });
            };
        }]
    });
