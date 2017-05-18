angular.module('admin')
    .controller('addCategory',['$uibModalInstance', '$scope', 'Categories', 'HttpResource',
        function($uibModalInstance, $scope, Categories, HttpResource){
            $scope.category = {};
            $scope.error = null;
            $scope.parent = Categories.curCategory;
            var query = {params1: 'category'};
            $scope.addCategory = function(){
                if (isValid() == true) {

                    if ($scope.parent) {
                        query['params2'] = $scope.parent.uuid
                    }

                    HttpResource.save(query, $scope.category, function (res) {
                        if ($scope.parent) {
                            $scope.parent.children.push(res);
                        } else {
                            Categories.categories.push(res);
                        }

                        $uibModalInstance.dismiss('cancel');
                        Categories.curCategory = null;
                    }, function (err) {
                        $scope.error = err;
                    })
                }

            };

            function isValid () {
                if (!$scope.category.name) return $scope.error = 'Введите название для категории';
                $scope.error = null;
                return true;
            }

            $scope.$on('$destroy', function () {
                Categories.curCategory = null;
            })
    }]);

