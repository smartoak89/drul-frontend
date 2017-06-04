angular.module('admin')
    .controller('delTemplate',['$uibModalInstance', '$scope', 'HttpResource', 'modalData', 'Templates',
        function($uibModalInstance, $scope, HttpResource, modalData, Templates){
            var id = modalData.template.uuid;
            $scope.subject = modalData.template.subject;

            $scope.delete = function () {
                Templates.remove(id, function (err) {
                    if (err) return $scope.error = err;
                    $uibModalInstance.dismiss();
                })
            };

        }]);