angular.module('admin')
    .controller('delTemplate',['$uibModalInstance', '$scope', 'HttpResource', 'modalData',
        function($uibModalInstance, $scope, HttpResource, modalData){
            var id = modalData.template.uuid;
            $scope.theme = modalData.template.theme;

            $scope.delete = function () {
                Stocks.remove(id, function (err) {
                    if (err) return $scope.error = err;
                    $uibModalInstance.dismiss();
                })
            };

        }]);