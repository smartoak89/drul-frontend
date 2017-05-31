angular.module('admin')
    .controller('editStock',['$uibModalInstance', '$scope', '$state', '$stateParams', 'Stocks', 'HttpResource', 'modalData',
        function($uibModalInstance, $scope, $state, $stateParams, Stocks, HttpResource, modalData){
            $scope.curStock = {
                name: modalData.stocks.name,
                percent: modalData.stocks.percent
            };
            this.$onInit = function () {
                console.log(modalData)
            }
            $scope.change = function(){
                HttpResource.put({params1: 'stock', params2: modalData.stocks.uuid}, $scope.curStock, function(res){
                    $uibModalInstance.dismiss('cancel');
                    modalData.stocks.percent = $scope.curStock.percent;
                    modalData.stocks.name = $scope.curStock.name;
                }, function(err){
                    $scope.error = err;
                })
            }
        }]);