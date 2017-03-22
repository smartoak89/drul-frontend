angular.module('app')
    .controller('buyNow', ['$uibModalInstance', '$scope', 'Httpquery', 'User', 'product', 'CurrencyService',
        function ($uibModalInstance, $scope, Httpquery, User, product, CurrencyService) {
        console.log(product);
        $scope.done = false;
        var order = {
            price: product.price,
            currency:  CurrencyService.cy,
            products:[{
                productID: product.uuid,
                combo: product.combo,
                price: product.price
            }]
        };

        $scope.save = function () {
            order.phone = $scope.number;
            console.log('$scope.number',order);
            Httpquery.save({params1: 'order', params2: 'now'}, order, function (res) {
                console.log('res', res);
                $scope.done = true;
            }, function (err) {
                console.log('err', err);
            });
        };

        $scope.close = function () {
            $uibModalInstance.dismiss();
        }
    }]);

