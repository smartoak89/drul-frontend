angular.module('app')
    .controller('done', ['$uibModalInstance', '$scope', 'Httpquery', 'User', function ($uibModalInstance, $scope, Httpquery, User) {

        $scope.close = function () {
            $uibModalInstance.dismiss();
        }
    }]);