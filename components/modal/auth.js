angular.module('app')
    .controller('auth', ['$uibModalInstance', '$scope', 'Httpquery', 'User','$location', 'Cart', function ($uibModalInstance, $scope, Httpquery, User, $location, Cart) {
        $scope.user = {};
        $scope.savePro = {
            image: '',
            combo: []
        }
        $scope.login = function () {
            if (isValid() == true) {
                Httpquery.save({params1: 'user', params2: 'auth'}, $scope.user, function (res) {
                    console.log('success', res);
                    User.set(res);
                    if(Cart.cartList != null && Cart.cartList != []){
                        angular.forEach(Cart.cartList, function(prod){
                            console.log(prod);
                            $scope.savePro.image = prod.image;
                            $scope.savePro.combo = prod.combo;
                            Cart.save(prod, $scope.savePro)
                        });
                        Cart.cartList = null;
                        Cart.list().then(function(){
                            angular.forEach(Cart.cartList, function(prod){
                                prod.counter = 1;
                            })
                        });

                    }
                    $scope.close();
                }, function (ex) {
                    $scope.error = ex.data.message;
                    console.log('error', ex);
                })
            }
        };

        var reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        function isValid () {
            if (!$scope.user.email) return $scope.error = 'Пожалуйста введите email!';
            if (!reg.test($scope.user.email)) return $scope.error = 'Некоректный email!';
            if (!$scope.user.password) return $scope.error = 'Пожалуйста введите пароль!';
            if ($scope.user.password.length < 4) return $scope.error = 'Пароль должен быть не менее 4 символов!';

            $scope.error = null;
            return true;
        }

        $scope.close = function () {
            $uibModalInstance.dismiss();
        }
    }]);