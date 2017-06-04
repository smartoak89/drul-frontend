angular.module('app')
    .controller('cancelCart', ['$uibModalInstance', '$scope', 'Httpquery', 'User', function ($uibModalInstance, $scope, Httpquery, User) {
        $scope.User = User;
        $scope.close = function () {
            $uibModalInstance.dismiss();
        }
    }]);
