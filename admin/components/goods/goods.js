angular.module('admin')
    .component('goods', {
        templateUrl: "admin/components/goods/goods.html",
        controller: ['Goods', '$q', '$location', function (Goods, $q, $location) {
            var self = this;
            self.prodService = Goods;
            self.search = {};

            Goods.list({}, function (res) {
                Goods.products = self.products = res;
            });


            self.removeProd = function (obj, index) {
                self.prodService.product = obj;
                self.prodService.productIndex = index;
            };

            this.edit = function (product) {
                Goods.editLocal(product);
            };

            var disabled = null;

            self.searchProducts= function(params) {

                if (!disabled) {
                    disabled = true;
                    Goods.list(params, function (products) {
                        self.products = products;
                        disabled = false;
                    });
                }
            }

            var selectedArr = Goods.selectedArr;

            self.selected = function (product) {
                if (product.selected) {
                    _.remove(selectedArr, product);
                    product.selected = false;
                } else {
                    selectedArr.push(product);
                    product.selected = true;
                }
            }

            // self.commonBehavior = {
            //     delete: function () {
            //         _.each(selectedArr, function (item) {
            //             Goods.
            //         })
            //     }
            // }

        }]
    });