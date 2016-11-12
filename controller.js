var app = angular.module('app');

app.controller('UploadCtrl', ['$scope', 'FileUploader', 'Conf', '$rootScope', function($scope, FileUploader, Conf, $rootScope) {
    var uploader = $scope.uploader = new FileUploader({
        url: Conf.api_path + '/file/d5cc1d58-1d5d-45ec-83d0-5807d4240ee7'
    });
    $scope.click = function () {
        console.log($scope);
    };
    $scope.main = function (index) {
        angular.forEach(uploader.queue, function (i, ind) {
            i.formData.main = (ind === index) ? true : false;
        });
    };
    $rootScope.$on('goodsCreated', function (a, goodScope) {
        if (uploader.queue.length < 1) {
            return goodScope.error = {data: {message: 'Добавте фото'}};
        }
        goodScope.error = null;
        // uploader.uploadAll();
        // uploader.dismiss = dismiss;
    });
    //
    // uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
    //     console.info('onWhenAddingFileFailed', item, filter, options);
    // };
    // uploader.onAfterAddingFile = function(fileItem) {
    //     console.info('onAfterAddingFile', fileItem);
    // };
    // uploader.onAfterAddingAll = function(addedFileItems) {
    //     console.info('onAfterAddingAll', addedFileItems);
    // };
    // uploader.onBeforeUploadItem = function(item) {
    //     console.info('onBeforeUploadItem', item);
    // };
    // uploader.onProgressItem = function(fileItem, progress) {
    //     console.info('onProgressItem', fileItem, progress);
    // };
    // uploader.onProgressAll = function(progress) {
    //     console.info('onProgressAll', progress);
    // };
    // uploader.onSuccessItem = function(fileItem, response, status, headers) {
    //     console.info('onSuccessItem', fileItem, response, status, headers);
    // };
    // uploader.onErrorItem = function(fileItem, response, status, headers) {
    //     console.info('onErrorItem', fileItem, response, status, headers);
    // };
    // uploader.onCancelItem = function(fileItem, response, status, headers) {
    //     console.info('onCancelItem', fileItem, response, status, headers);
    // };
    // uploader.onCompleteItem = function(fileItem, response, status, headers) {
    //     console.info('onCompleteItem', fileItem, response, status, headers);
    // };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
        uploader.dismiss();
    };

}]);