angular.module('admin')
    .controller('delCategory',['$uibModalInstance', '$scope', 'Categories', 'HttpResource', 'modalData',
        function($uibModalInstance, $scope, Categories, HttpResource, modalData){
            $scope.name = Categories.curCategory.name;
            $scope.error = null;
            $scope.delete = function(){
                HttpResource.delete({params1:'category', params2:Categories.curCategory.uuid}, function(resp){
                    $uibModalInstance.dismiss('cancel');
                    modalData.cellTemplateScope.after();
                }, function(err){
                    $scope.error = err;
                })
            }
        }]);