angular.module('app')
    .controller('user-info', ['$scope', '$uibModalInstance', 'modalData', 'OrderService', 'Httpquery',
        function ($scope, $uibModalInstance, modalData, OrderService, Httpquery) {
            console.log('user', modalData.user);
            $scope.user = angular.copy(modalData.user);
            $scope.edit = false;

            OrderService.getListHistoryOrders(function (err, list) {
                $scope.orders = list;
            });

            $scope.editBallance = function () {
                if($scope.user.ballance && $scope.user.ballance >= 0) {

                    Httpquery.put({params1: 'user', params2: 'admin', params3: $scope.user.uuid}, $scope.user, function (res) {
                        modalData.user = $scope.user;
                        $scope.editBallanceMode = false;
                    }, function (err) {
                        console.log('error', err);
                    })

                }
            }

        }]);