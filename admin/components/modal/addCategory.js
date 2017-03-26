angular.module('admin')
    .controller('addCategory',['$uibModalInstance', '$scope', 'Categories', 'HttpResource',
        function($uibModalInstance, $scope, Categories, HttpResource){
            $scope.category = {};
            $scope.error = null;
            $scope.parent = Categories.curCategory;

            $scope.transliterate = function(text, value) {
                $scope.category[value] = Categories.translite(text);
                };

            $scope.addCategory = function(){
                if (isValid() == true) {
                    $scope.transliterate($scope.category.name, 'slug');

                    if(!$scope.parent) {
                        $scope.category.level = 1;
                        HttpResource.save({params1: 'category'}, $scope.category, function (resp) {
                            $scope.category.uuid = resp.uuid;
                            Categories.categories.push($scope.category);
                            $uibModalInstance.dismiss('cancel');
                        }, function (err) {
                            $scope.error = err.data.message;
                        })
                    }else{
                        $scope.category.level = 2;
                        HttpResource.save({params1:'category', params2 :$scope.parent.uuid}, $scope.category, function (resp) {
                            $scope.parent.children.push($scope.category);
                            $uibModalInstance.dismiss('cancel');
                            Categories.curCategory = null;
                            Categories.curIndex = null;
                        }, function (err) {
                            $scope.error = err;
                        })
                    }
                }

            }

            function isValid () {
                if (!$scope.category.name) return $scope.error = 'Введите название для категории';
                if (!$scope.category.article) return $scope.error = 'Введите артикул для данной категории';
                $scope.error = null;
                return true;
            }
    }])

