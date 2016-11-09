angular.module('admin')
    .controller('remove-user',['$uibModalInstance', '$scope', 'Users', 'HttpResource', 'modalData',
        function($uibModalInstance, $scope, Users, HttpResource, modalData){
            var id = modalData.user.uuid;
            $scope.email = modalData.user.email;
            $scope.delete = function () {
                Users.remove(id, function (err) {
                    if (err) return $scope.error = err;
                    $uibModalInstance.dismiss();
                })
            };

        }]);