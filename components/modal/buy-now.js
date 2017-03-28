angular.module('app')
    .controller('buyNow', ['$uibModalInstance', '$scope', 'Httpquery', 'User', 'product', 'CurrencyService', '$timeout',
        function ($uibModalInstance, $scope, Httpquery, User, product, CurrencyService, $timeout) {
        console.log(product);
        $scope.done = false;
        var user = angular.copy(User.get());
        $scope.order = {
            price: product.price,
            currency:  CurrencyService.cy,
            phone: user.phone || null,
            products:[{
                productID: product.uuid,
                combo: product.combo,
                price: product.price
            }]
        };

        $scope.save = function () {
            console.log($scope.order.phone);
            if ($scope.isValid() === true) {
                Httpquery.save({params1: 'order', params2: 'now'}, $scope.order, function (res) {
                    console.log('res', res);
                    $scope.done = true;
                    $timeout(function () {
                        $uibModalInstance.dismiss()
                    }, 3000)
                }, function (err) {
                    console.log('err', err);
                });
            }
        };

        $scope.close = function () {
            $uibModalInstance.dismiss();
        }

        $scope.isValid = function () {
            console.log($scope.order.phone);
            if (!$scope.order.phone) return $scope.error = 'Укажите мобильный номер получателя!';
            if ($scope.order.phone.length < 10 || $scope.order.phone.length > 12) return $scope.error = 'Мобильный телефон введен некорректно!';
            $scope.error = '';
            return true;
        }
    }]);

