angular.module('admin')
    .component('goods', {
        templateUrl: "admin/components/goods/goods.html",
        controller: ['Goods', '$q', '$location', 'Conf','Stocks', function (Goods, $q, $location, Conf, Stocks) {
            var self = this;
            self.prodService = Goods;
            self.Conf = Conf;
            self.search = {};
            self.stocks = Stocks;


            Goods.list({sort: 'created.desk', limit: 30}, function (res) {
                self.stocks.list(function(stocksList){
                    self.stocksList = stocksList;
                    console.log(self.stocksList);
                    _.each(res, function(elem){
                        if(_.find(self.stocksList, {uuid: elem.stock.stock_id})){
                            elem.stock.name = _.find(self.stocksList, {uuid: elem.stock.stock_id}).name;
                            elem.stock.percent = _.find(self.stocksList, {uuid: elem.stock.stock_id}).percent;
                        }
                    })
                });

                    Goods.products = self.products = res;
                });

            this.categoryText = function(category) {
                var text = category.name[0];

                if (category.name.length > 1) {
                    for (var i=1; i<category.name.length; i++) {
                        text += ' | ' + category.name[i];
                    }
                }

                return text;
            };

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
            };

            var selectedArr = Goods.selectedArr;

            self.selected = function (product) {
                if (product.selected) {
                    _.remove(selectedArr, product);
                    product.selected = false;
                } else {
                    if (_.find(selectedArr, {uuid: product.uuid})) return;
                    selectedArr.push(product);
                    product.selected = true;
                }
            };

            self.cancelSelected = function () {
                _.each(selectedArr, function (prod) {
                    _.remove(selectedArr, prod);
                    prod.selected = false;
                });
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