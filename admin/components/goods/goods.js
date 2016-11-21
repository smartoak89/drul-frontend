angular.module('admin')
    .component('goods', {
        templateUrl: "admin/components/goods/goods.html",
        controller: ['Goods', '$q', '$location', function(Goods, $q, $location) {
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
        controller: ['Goods', 'FileUploader', 'Conf', 'File', 'Categories', '$state', 'Stocks', '$q',
            function(Goods, FileUploader, Conf, File, Categories, $state, Stocks, $q) {
            var self = this;
            self.categories = Categories.categories;
            self.combinations = Goods.combinations;
            $q.all([Categories.list(), Goods.listComb()]).then(function(){
                self.categories = Categories.categories;
                self.combinations = Goods.combinations;
                console.log(self.combinations);
            });
            this.stocks = Stocks.list();
            this.editMode = true;
            this.product = Goods.editprod;
            this.preview = this.product.photo || '';
            this.range = [35,36,37,38,39,40,41,42,43,44,45,46];
            this.selected = _.find(this.categories, {slug: this.product.category});
                    //console.log(this.categories[1].children[0]);
                    //console.log(_(this.categories).thru(function(coll) {return _.union(coll, _.map(coll, 'children'))}).flatten())

            this.$onInit = function () {
                getGallery ();
                if (self.product && !self.product.article) {
                    // self.categArticle = _.find(self.categories, {slug: self.product.category});
                    // self.product.article = categArticle + '.';
                }
            };

            function getGallery () {
                Goods.getGallery(self.product, function (err) {
                    if (err) console.trace('error', err);
                });
            }

                this.stockFun = function (per, price){
                self.stockCost = Goods.countStock(per, price);
            }

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
                    $state.go('admin.goodsAdmin');
                    self.editMode = false;
                });

            };
            uploader.onCompleteAll = function() {
                getGallery();
                self.editMode = false;
            };

            this.view = function(prop){
                console.log(prop)
            };

            this.actionCombo = function(prop, comb){
                if(prop){
                    self.product.combo[comb.slug] = {name: comb.name, uuid: comb.uuid};
                }else{
                    delete self.product.combo[comb.slug];
                }
            };

            this.chooseMain = function (index) {
                angular.forEach(uploader.queue, function (i, ind) {
                    i.alias = (ind === index) ? 'main' : 'gallery';
                });
            };
        }]
    });
