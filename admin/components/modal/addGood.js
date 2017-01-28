angular.module('admin')
    .controller('addGood',['$uibModalInstance', '$scope', 'Goods', 'Categories', 'HttpResource', '$location', '$q',
        function($uibModalInstance, $scope, Goods, Categories, HttpResource, $location, $q){
            $scope.error = null;
            $scope.newProduct = {};

            Categories.list(function(categories){
                $scope.categories = categories;
                console.log('categoryList', $scope.categories)
            });

            $scope.addProduct = function(){
                Goods.add($scope.newProduct, function (err) {
                    if (err) return $scope.error = err;
                    $uibModalInstance.dismiss();
                })
            };

            $scope.addCategory = function (category, parent) {
                disableCheck();
                category.check = true;

                $scope.newProduct.category = {
                    name: [],
                    slug: []
                };

                $scope.newProduct.category.name[0] = category.name;
                $scope.newProduct.category.slug[0] = category.slug;

                if (parent) {
                    $scope.newProduct.category.name[1] = parent.name;
                    $scope.newProduct.category.slug[1] = parent.slug;

                }

            };

            function disableCheck() {
                $scope.categories.reduce(function (arr, category) {
                    if (category.children.length > 0) {
                        _.each(category.children, function (item) {
                            item.check = false;
                        })
                    }
                    return category.check = false;
                }, $scope.categories[0]);
            }
            $scope.$on('$destroy', function () {
                console.log('destroy');
                _.each($scope.categories, function (item) {
                    item.show = false;
                })
            })

        }]);