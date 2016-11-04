angular.module('admin')
    .controller('delCategory',['$uibModalInstance', '$scope', 'Categories', 'HttpResource',
        function($uibModalInstance, $scope, Categories, HttpResource){
            $scope.name = Categories.curCategory.name;
            $scope.error = null;
            $scope.delete = function(){
                if(!Categories.curParent){
                    HttpResource.delete({params1:'category', params2:Categories.curCategory.uuid}, function(resp){
                        console.log(resp);
                        Categories.categories.splice(Categories.curIndex, 1);
                        $uibModalInstance.dismiss('cancel');
                        Categories.curCategory = null;
                        Categories.curIndex = null;
                    }, function(err){
                        $scope.error = err;
                    })
                }else{
                    HttpResource.delete({params1:'category', params2:Categories.curParent.uuid, params3:Categories.curIndex}, function(resp){
                        console.log(resp);
                        Categories.categories[Categories.curParentIndex].children.splice(Categories.curIndex, 1);
                        $uibModalInstance.dismiss('cancel');
                        Categories.curCategory = null;
                        Categories.curIndex = null;
                        Categories.curParent = null;
                        Categories.curParentIndex = null;
                    }, function(err){
                        $scope.error = err;
                    })
                }
            }
        }]);