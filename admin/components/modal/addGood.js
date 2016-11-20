angular.module('admin')
    .controller('addGood',['$uibModalInstance', '$scope', 'Goods', 'Categories', 'HttpResource', '$location', '$q',
        function($uibModalInstance, $scope, Goods, Categories, HttpResource, $location, $q){
            Categories.list().then(function(){
                $scope.categories = Categories.categories;
            });
            $scope.newProduct = {};

            $scope.addProduct = function(){
                HttpResource.save({params1: 'product'}, $scope.newProduct, function (resp) {
                    console.log('added product', resp);
                    Goods.editLocal(resp);
                    $uibModalInstance.dismiss('cancel');
                    Goods.products.push($scope.newProduct);
                }, function (err) {
                    $scope.error = err;
                })
            };

            $scope.addCategToProduct = function (category) {
                console.info(category);
                $scope.newProduct.category = category.slug;
            };


            $scope.newProduct.fields = [];
            $scope.error = null;
            $scope.range = [35,36,37,38,39,40,41,42,43,44,45,46];
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
            $scope.view = function(){
                console.log($scope.newProduct.image);
            };
            $scope.addToProduct = function(name, prop){
                $scope.newProduct.fields.push({name: name, prop: prop});
                console.log($scope.newProduct);
                $scope.newfiled = false;
            };

            $scope.showSelected = function(sel) {
                console.log(sel);

            };

            // var uploader = $scope.uploader = new FileUploader({
            //     url: Conf.api_path + '/file'
            // });
            // uploader.onAfterAddingAll = function() {
            //     $scope.newProduct.photos = true;
            // };
            // uploader.onCompleteAll = function() {
            //     // $uibModalInstance.dismiss('cancel');
            // };
            // $scope.main = function (index) {
            //     angular.forEach(uploader.queue, function (i, ind) {
            //         i.formData.main = (ind === index) ? true : false;
            //     });
            // };
            //
            // $scope.click = function () {
            //     uploader.queue[0].alias = 'Nechto';
            //     console.log(uploader);
            // }

        }]);