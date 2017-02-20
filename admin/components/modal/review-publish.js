angular.module('admin')
    .controller('review-publish',['$uibModalInstance', '$rootScope', '$scope', 'ReviewsAdmin', 'HttpResource', 'modalData',
        function($uibModalInstance,$rootScope, $scope, ReviewsAdmin, HttpResource, modalData){
            $scope.userName = modalData.comm.owner_name;
            $scope.error = null;
            var reviewId = modalData.comm.uuid;

            $scope.ok = function () {
                modalData.comm.publish = true;

                ReviewsAdmin.changeStatus(modalData.comm, function (err, res) {
                    if (err) return $scope.error = err.message;
                    $rootScope.$broadcast('reviewPublished', reviewId);
                    $uibModalInstance.close();
                })
            };

        }]);