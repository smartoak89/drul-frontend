angular.module('admin')
    .component('goods', {
        templateUrl: "admin/components/goods/goods.html",
        controller: ['Goods', '$q', '$location', 'Conf','Stocks','$state', function (Goods, $q, $location, Conf, Stocks, $state) {
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

            var selectedArr = Goods.selectedArr = [];

            self.selected = function (product) {
                product.selected = !product.selected;

                if (product.selected) {
                    selectedArr.push(product);
                } else {
                    _.remove(selectedArr, product);
                }
            };

            self.cancelSelected = function () {
                _.each(selectedArr, function (prod) {
                    prod.selected = false;
                });
                selectedArr = Goods.selectedArr = [];
            };
            this.workWithNew = function (type) {
                var arr = angular.copy(selectedArr);
                var prods;
                if (type == 'add') {

                    prods = arr.filter(function (p) {
                        if (p.groups.indexOf('new') === -1) {
                            p.groups.push('new');
                            return p;
                        }
                    });

                }
                if (type == 'remove') {
                    console.log('remove')
                    prods = arr.filter(function (p) {
                        var ind = p.groups.indexOf('new');
                        if (ind !== -1) {
                            p.groups.splice(ind, 1);
                            return p;
                        }
                    });
                }

                if (prods && prods.length !== 0) {
                    self.gropsProcessing = true;
                    Goods.updateGroupProduct(prods).then(function (res) {
                        selectedArr = Goods.selectedArr = [];
                        self.gropsProcessing = false;
                        $state.reload();
                    }, function (err) {
                        self.gropsProcessing = false;
                        console.error(err);
                    });
                }
            };

            var skip = 0;
            self.showMore = function () {

                skip += 1;
                Goods.list({skip: skip, sort: 'created.desk', limit: 30}, function (res) {
                    Goods.products = self.products = self.products.concat(res);
                });
            };

            this.groups = function(p, g) {
                if (p) return p.groups.indexOf(g) != -1;

            }

        }]
    });