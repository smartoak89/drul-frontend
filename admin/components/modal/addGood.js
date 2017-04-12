angular.module('admin')
    .controller('addGood',['$uibModalInstance', '$scope', 'Goods', 'Vendors', 'Categories', 'HttpResource', '$location', '$q',
        function($uibModalInstance, $scope, Goods, Vendors, Categories, HttpResource, $location, $q){
            $scope.error = null;
            $scope.newProduct = {};

            Vendors.getVendors(function(err, res){
                if(err){console.log(err)}
                else{
                    console.log(res);
                    $scope.vendor = res;
                }
            });

            Categories.list(function(categories){
                if (!categories) return $scope.error = 'Для добавления товара нужно добавить категорию';
                $scope.categories = categories;
            });

            $scope.addProduct = function(){
                if (isValid() == true) {
                    Goods.add($scope.newProduct, function (err) {
                        if (err) return $scope.error = err.data.message;
                        $uibModalInstance.dismiss();
                    })
                }
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

            function isValid () {
                if (!$scope.newProduct.name) return $scope.error = 'Введите название товара';
                if (!$scope.newProduct.category) return $scope.error = 'Выберите категорию для товара';
                $scope.error = null;
                return true;
            }

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
                _.each($scope.categories, function (item) {
                    item.show = false;
                })
            })

        }]);