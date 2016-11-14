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
        controller: ['Goods', 'FileUploader', 'Conf', function(Goods, FileUploader, Conf) {
            this.editMode = false;
            this.product = Goods.editprod;
            this.preview = this.product.photo;
            this.range = [35,36,37,38,39,40,41,42,43,44,45,46];

            this.edit = function () {
                this.editMode = true;
            };
            this.save = function () {
                this.editMode = false;
            }

            // Uploader
            var uploader = this.uploader = new FileUploader({
                url: Conf.api_path + '/file/' + Goods.editprod.uuid
            });
            uploader.onAfterAddingAll = function() {
                uploader.queue[0].alias = 'main'
            };
            // uploader.onCompleteAll = function() {
            //     // $uibModalInstance.dismiss('cancel');
            // };
            this.chooseMain = function (index) {
                console.log(index);
                angular.forEach(uploader.queue, function (i, ind) {
                    i.alias = (ind === index) ? 'main' : 'gallery';
                });
            };
        }]
    });
