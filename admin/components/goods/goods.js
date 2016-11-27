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
            self.stocks = Stocks.stocksList;
            self.pror = {};
            $q.all([Categories.list(), Goods.listComb(), Stocks.list()]).then(function(){
                self.categories = Categories.categories;
                self.combinations = Goods.combinations;
                self.stocks = Stocks.stocksList;
                if(self.product.stock != null){
                    self.curStock = _.find(self.stocks, {uuid: self.product.stock});
                    self.stockFun(self.curStock.percent, self.product.price);

                }else{
                    self.curStock = null;
                }
            });

            this.editMode = true;
            this.product = Goods.editprod;
            //if(this.product.stock){
            //    self.stocks = Stocks.stocksList;
            //    self.curStock = _.find(self.stocks, {uuid: self.product.stock});
            //    self.stockFun(self.curStock.percent, self.product.price);
            //}else{
            //    self.curStock = null;
            //}
            this.preview = this.product.photo || '';
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

            this.findComboModel = function (name) {
                console.log('init')
                var index = _.findIndex(self.product.combo, {name : name} );
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
            this.stockFun = function (per, price){
                self.stockCost = Goods.countStock(per, price);
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
                self.editMode = !self.editMode;
            };
            this.delCombo= function (name){
                _.remove(self.product.combo, {name: name});
            };
            this.save = function () {
                //console.log(self.curStock);
                self.product.stock = self.curStock.uuid;
                Goods.update(self.product, function (err, res) {
                    if (err) return self.error = err;

                    if (uploader.queue.length > 0) {
                        return uploader.uploadAll();
                    }
                    res.photo = self.product.photo;
                    res.gallery = self.product.gallery;
                    console.info('Update product => ', res);
                    Goods.products[_.findIndex(Goods.products, {uuid: res.uuid})] = res;
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

            this.addSub = function(n,v){
                if (n && v ){
                    if (!self.product.sublines){
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
        }]
    });
