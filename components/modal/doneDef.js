angular.module('app')
    .controller('doneDef', ['$uibModalInstance', '$scope', 'Httpquery', 'User', function ($uibModalInstance, $scope, Httpquery, User) {

        $scope.close = function () {
            $uibModalInstance.dismiss();
        }
    }]);