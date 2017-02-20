angular.module('admin')
    .controller('review-remove',['$uibModalInstance', '$rootScope', '$scope', 'ReviewsAdmin', 'HttpResource', 'modalData',
        function($uibModalInstance,$rootScope, $scope, ReviewsAdmin, HttpResource, modalData){
            $scope.userName = modalData.comm.owner_name;
            $scope.error = null;
            var reviewId = modalData.comm.uuid;

            $scope.delete = function () {
                ReviewsAdmin.remove(reviewId, function (err, res) {
                    if (err) return $scope.error = err.message;
                    $rootScope.$broadcast('reviewRemoved', reviewId);
                    $uibModalInstance.close();
                })
            };

        }]);