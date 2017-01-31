angular.module('app')
    .controller('user-editor', ['$scope', '$uibModalInstance', 'modalData', 'Users',
        function ($scope, $uibModalInstance, modalData, Users) {
            $scope.user = angular.copy(modalData.user);
            $scope.error = null;

            $scope.edit = function () {
                validate($scope.user, function (err) {
                    if (err) return $scope.error = err;
                    $scope.error = null;
                    console.log('all right');
                })
            };

            $scope.close = function () {
                $uibModalInstance.dismiss();
            };

            function validate (user, callback) {
                var reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                if (!user.firstname) return callback('Пожалуйста введите имя!');
                if (!user.lastname) return callback('Пожалуйста введите Фамилию!');
                if (!user.email) return callback('Пожалуйста введите email!');
                if (!reg.test(user.email)) return callback('Некоректный email!');
                // if (!user.state) return callback('Выберите страну!');
                if (!user.phone) return callback('Пожалуйста введите номер телефона!');

                return callback(null);

            }
    }]);