angular.module('app')
    .controller('buyNow', ['$uibModalInstance', '$scope', 'Httpquery', 'User', function ($uibModalInstance, $scope, Httpquery, User) {

        $scope.close = function () {
            $uibModalInstance.dismiss();
        }
    }]);

