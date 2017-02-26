angular.module('app')
    .controller('delDef', ['$uibModalInstance', '$scope', 'Httpquery', 'User', function ($uibModalInstance, $scope, Httpquery, User) {
        $scope.User = User;
        $scope.close = function () {
            $uibModalInstance.dismiss();
        }
    }]);