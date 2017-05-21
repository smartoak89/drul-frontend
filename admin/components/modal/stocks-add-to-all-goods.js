angular.module('app')
    .controller('stocks-add-to-all-goods', ['$scope', '$uibModalInstance', 'Goods', 'Stocks', 'HttpResource', '$q',
        function ($scope, $uibModalInstance, Goods, Stocks, HttpResource, $q) {
            $scope.error = null;
            $scope.goods = Goods;
            $scope.selected = angular.copy(Goods.selectedArr);
            $scope.checkedStock = {};

            Stocks.list(function(stocksList){
                $scope.stocksList = stocksList;
            });

            $scope.add = function(){

                if ($scope.selected.length > 0) {
                    if ($scope.checkedStock.stock){
                        _.each($scope.selected, function (product) {
                            applyStock(JSON.parse($scope.checkedStock.stock), product);

                            $q.all(HttpResource.put({params1: 'product', params2: product.uuid}, product, function (res) {
                                var index = _.findIndex(Goods.products, {uuid: res.uuid});
                                Goods.products[index].price = res.price;
                                Goods.products[index].stock = res.stock;
                                Goods.products[index].selected = false;
                                _.remove(Goods.selectedArr, {uuid: res.uuid})
                            }, function (err) {
                                $scope.error = err.message;
                            })).then(function (res) {
                                $uibModalInstance.close();
                            })
                        })
                    }else {
                        $scope.error = 'Выберите акцию из списка'
                    }

                } else {
                    $scope.error = 'Вы не отметили ни одного товара'
                }
            };

            applyStock = function (stock, product) {

                if (product.stock) {
                    product.price = product.stock.old_price;
                }

                product.stock = {
                    stock_id: stock.uuid,
                    old_price: product.price
                };

                product.price = Math.round(product.stock.old_price - ( product.stock.old_price * stock.percent / 100 ));
            };

            $scope.$on('$destroy', function () {
                $scope.selected = null;
            })

        }]);