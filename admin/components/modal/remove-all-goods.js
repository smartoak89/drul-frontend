angular.module('admin')
    .controller('remove-all-goods',['$uibModalInstance', '$scope', 'Goods', 'HttpResource', '$q',
        function($uibModalInstance, $scope, Goods, HttpResource, $q){
            $scope.error = null;
            $scope.goods = Goods;
            $scope.delete = function(){
                if (Goods.selectedArr.length > 0) {
                    _.each(Goods.selectedArr, function (item) {
                        $q.all(HttpResource.delete({params1: 'product', params2: item.uuid}, function (resp) {
                            _.remove(Goods.products, {uuid: item.uuid});
                            _.remove(Goods.selectedArr, {uuid: item.uuid});
                        }, function (err) {
                            $scope.error = err.message;
                        })).then(function (res) {
                            $uibModalInstance.close();
                        })
                    })
                } else {
                    $scope.error = 'Вы не отметили ни одного товара'
                }
            }
        }]);
