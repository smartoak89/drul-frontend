angular.module('admin')
    .component('goods', {
        templateUrl: "admin/components/goods/goods.html",
        controller: ['Goods', '$q', '$location', 'Conf', function (Goods, $q, $location, Conf) {
            var self = this;
            self.prodService = Goods;
            self.Conf = Conf;
            self.search = {};

            Goods.list({sort: 'created.desk', limit: 30}, function (res) {
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
                params.sort = 'created.desk';
                params.limit = 30;

                if (!disabled) {
                    disabled = true;
                    Goods.list(params, function (products) {
                        Goods.products = self.products = products;
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
            };

            var skip = 0;
            self.showMore = function () {

                skip += 1;
                Goods.list({skip: skip, sort: 'created.desk', limit: 30}, function (res) {
                    Goods.products = self.products = self.products.concat(res);
                });
            };

        }]
    });