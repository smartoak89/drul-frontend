angular.module('admin')
    .controller('addCategory',['$uibModalInstance', '$scope', 'Categories', 'HttpResource',
        function($uibModalInstance, $scope, Categories, HttpResource){
            $scope.category = {};
            $scope.error = null;
            $scope.transliterate = function(text, value) {
                $scope.category[value] = Categories.translite(text);
                };
            $scope.parent = Categories.curCategory;
            console.log($scope.parent);
            $scope.addCategory = function(){
                $scope.transliterate($scope.category.name, 'slug');
                console.log($scope.category);
                if(!$scope.parent) {
                    HttpResource.save({params1: 'category'}, $scope.category, function (resp) {
                        $scope.category.uuid = resp.uuid;
                        Categories.categories.push($scope.category);
                        $uibModalInstance.dismiss('cancel');
                    }, function (err) {
                        console.log(err);
                        $scope.error = err;
                    })
                }else{
                    HttpResource.save({params1:'category', params2:$scope.parent.uuid}, $scope.category, function (resp) {
                        $scope.parent.children.push($scope.category);
                        $uibModalInstance.dismiss('cancel');
                        Categories.curCategory = null;
                        Categories.curIndex = null;
                    }, function (err) {
                        console.log(err);
                        $scope.error = err;
                    })
                }
            }
    }])

