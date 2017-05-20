angular.module('admin')
    .controller('addGood',['$uibModalInstance', '$scope', 'Goods', 'Vendors', 'Categories', 'HttpResource', '$location', '$q',
        function($uibModalInstance, $scope, Goods, Vendors, Categories, HttpResource, $location, $q){
            $scope.error = null;
            $scope.newProduct = {};

            Vendors.getVendors(function(err, res){
                if (err) return console.log(err);
                if (!res) return $scope.error = 'Для добавления товара нужно добавить поставщика';
                $scope.vendor = res;
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



            function isValid () {
                if (!$scope.newProduct.name) return $scope.error = 'Введите название товара';
                if ($scope.newProduct.name.length < 4) return $scope.error = 'Название товара должно содержать 3 и более символов';
                if (!$scope.newProduct.article) return $scope.error = 'Введите поставщика для товара';
                if (!$scope.newProduct.category) return $scope.error = 'Выберите категорию для товара';
                $scope.error = null;
                return true;
            }
            $scope.addCategory = function (category, parent) {
                disableCheck();
                category.check = true;
                $scope.newProduct.category = {
                    id: category.uuid,
                    slug: category.path.map(function(item) {
                        return item.slug;
                    }),
                    name: category.path.map(function(item) {
                        return item.name;
                    })
                };

                console.log('product', $scope.newProduct)
            };

            function disableCheck() {
                $scope.categories.reduce(function (arr, category) {
                    if (category.children.length > 0) {
                        _.each(category.children, function (item) {
                            if (item.children.length > 0) {
                                _.each(item.children, function (item2) {
                                    item2.check = false;
                                })
                            }
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