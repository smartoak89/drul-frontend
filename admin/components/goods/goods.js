angular.module('admin')
    .component('goods', {
        templateUrl: "admin/components/goods/goods.html",
        controller: ['Goods',function(Goods) {
            var self = this;
            this.products = Goods.list();
            self.prodService = Goods;

            self.removeProd = function(obj, index){
                self.prodService.product = obj;
                self.prodService.productIndex = index;
            }
        }]
    });
