angular.module('admin')
    .controller('remove-user',['$uibModalInstance', '$scope', 'User', 'HttpResource', 'modalData',
        function($uibModalInstance, $scope, User, HttpResource, modalData){
            var id = modalData.user.uuid;
            $scope.name = modalData.user.name;
            console.log('User', modalData);
            $scope.delete = function () {
                Stocks.remove(id, function (err) {
                    if (err) return $scope.error = err;
                    $uibModalInstance.dismiss();
                })
            };

        }]);