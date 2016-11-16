angular.module('app')
    .controller('doneCart', ['$uibModalInstance', '$scope', 'Httpquery', 'User', function ($uibModalInstance, $scope, Httpquery, User) {
        $scope.User = User;
        $scope.close = function () {
            $uibModalInstance.dismiss();
        }
    }]);
