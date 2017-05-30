angular.module('admin')
    .controller('editCategory',['$uibModalInstance', '$scope', 'Categories', 'HttpResource', 'modalData',
        function($uibModalInstance, $scope, Categories, HttpResource, modalData){
            $scope.curCategName = modalData.cellTemplateScope.branch.name;
            $scope.curCategId = modalData.cellTemplateScope.branch.uuid;
            this.$onInit = function () {
                console.log(modalData.cellTemplateScope.branch)
            }
            $scope.change = function(){
                HttpResource.put({params1: 'category', params2: $scope.curCategId}, $scope.curCategName, function(res){
                    $uibModalInstance.dismiss('cancel');
                    $state.reload();
                }, function(err){
                    $scope.error = err;
                })
            }
        }]);