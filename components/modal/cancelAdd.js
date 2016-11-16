angular.module('app')
    .controller('cancelAdd', ['$uibModalInstance', '$scope', 'Httpquery', 'User', function ($uibModalInstance, $scope, Httpquery, User) {

        $scope.close = function () {
            $uibModalInstance.dismiss();
        }
    }]);
