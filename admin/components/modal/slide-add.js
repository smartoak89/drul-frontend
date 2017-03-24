angular.module('app')
    .controller('slide-add', ['$scope', '$uibModalInstance', 'modalData', 'FileUploader', 'Conf',
        function ($scope, $uibModalInstance, modalData, FileUploader, Conf) {

            $scope.close = function () {
                $uibModalInstance.dismiss();
            };

            // Uploader
            var uploader = $scope.uploader = new FileUploader({
                url: Conf.api_path + '/file/5f0eeb5f-3fd7-4932-8ea8-3abf1578242c'
            });
            uploader.onAfterAddingAll = function () {
                _.each(uploader.queue, function(img){
                    img.alias = 'slide';
                });

            };
            uploader.onCompleteAll = function () {
                uploader.queue = [];
                self.uploading = false;
                self.getSlider()
            };
            uploader.uploadSlide = function(){
                self.uploading = true;
                uploader.uploadAll();
            };

        }]);