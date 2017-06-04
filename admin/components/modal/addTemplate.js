angular.module('admin')
    .controller('addTemplate',['$scope', '$uibModalInstance', 'Templates',
        function ($scope, $uibModalInstance, Templates){
            $scope.template = {};
            $scope.error = null;

            $scope.createTemplate = function () {
                if (isValid() === true) {
                    Templates.create($scope.template, function (err) {
                        if (err) return $scope.error = err.data.message;
                        $uibModalInstance.dismiss();
                    });
                }
            };

            function isValid () {
                if (!$scope.template.subject) return $scope.error = 'Введите тему шаблона';
                if (!$scope.template.body) return $scope.error = 'Введите сообщение шаблона';
                $scope.error = null;
                return true;
            }
        }]);
