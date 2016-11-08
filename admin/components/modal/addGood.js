angular.module('admin')
    .controller('addGood',['$uibModalInstance', '$scope', 'Goods', 'Categories', 'HttpResource',
        function($uibModalInstance, $scope, Goods, Categories, HttpResource){
            $scope.newProduct = {};
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
                scrollInertia: 0
            };
            $scope.config1 = {
                autoHideScrollbar: true,
                theme: 'minimal-dark',
                advanced:{
                    updateOnContentResize: true
                },
                setHeight: 50,
                scrollInertia: 0
            };

            $scope.addProduct = function(){
                HttpResource.save({params1:'product'}, $scope.newProduct, function(resp){

                }, function(err){
                    $scope.error = err;
                })
            }
            $scope.view = function(){
                console.log($scope.newProduct.image);
            }
        }]);