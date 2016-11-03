angular.module('admin')
    .controller('addCategory',['$uibModalInstance', '$scope', 'Categories', 'HttpResource',
        function($uibModalInstance, $scope, Categories, HttpResource){
            $scope.category = {};
            $scope.error = null;
            $scope.transliterate = function(text) {
                text = text.toLowerCase();
                var
                rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),
                eng = "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g);
                    for(var x = 0; x < rus.length; x++) {
                        text = text.split(rus[x]).join(eng[x]);
                    }
                    text = text.replace(' ', '-');
                    $scope.category.link = text;
                };
            $scope.parent = Categories.curCategory;
            console.log($scope.parent);
            $scope.addCategory = function(){
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

