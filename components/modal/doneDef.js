angular.module('app')
    .controller('doneDef', ['$uibModalInstance', '$scope', 'Httpquery', 'User', function ($uibModalInstance, $scope, Httpquery, User) {
        $scope.User = User;
        $scope.close = function () {
            $uibModalInstance.dismiss();
        }
    }]);