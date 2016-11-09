angular.module('admin')
    .controller('addGood',['$uibModalInstance', '$scope', 'Goods', 'Categories', 'HttpResource',
        function($uibModalInstance, $scope, Goods, Categories, HttpResource){
            $scope.newProduct = {};
            $scope.newProduct.fields = [];
            $scope.error = null;
            $scope.range = [35,36,37,38,39,40,41,42,43,44,45,46];
            $scope.categories = Categories.list();
            $scope.products = Goods.list();
            $scope.config = {
                autoHideScrollbar: true,
                theme: 'minimal-dark',
                advanced:{
                    updateOnContentResize: true
                },
                setHeight: 400,
                scrollInertia: 0,
                axis: 'y'
            };

            $scope.addProduct = function(){
                console.log($scope.newProduct);
                //HttpResource.save({params1:'product'}, $scope.newProduct, function(resp){
                //
                //}, function(err){
                //    $scope.error = err;
                //})
            }
            $scope.view = function(){
                console.log($scope.newProduct.image);
            }
            $scope.addToProduct = function(name, prop){
                $scope.newProduct.fields.push({name: name, prop: prop});
                console.log($scope.newProduct);
                $scope.newfiled = false;
            }
            $scope.treeData = new kendo.data.HierarchicalDataSource({ data: $scope.categories});
            console.log($scope.treeData);
            $scope.click = function(dataItem) {
                alert(dataItem.text);
            };
        }]);