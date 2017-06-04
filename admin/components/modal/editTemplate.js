angular.module('admin')
    .controller('editTemplate',['$uibModalInstance', '$scope', 'HttpResource', 'modalData', 'Templates',
        function($uibModalInstance, $scope, HttpResource, modalData, Templates){
            $scope.curTemplate = {
                subject: modalData.template.subject,
                body: modalData.template.body
            };
            $scope.change = function(){
                HttpResource.put({params1: 'template', params2: modalData.template.uuid}, $scope.curTemplate, function(res){
                    $uibModalInstance.dismiss('cancel');
                    modalData.template.subject = $scope.curTemplate.subject;
                    modalData.template.body = $scope.curTemplate.body;
                }, function(err){
                    $scope.error = err;
                })
            }
        }]);