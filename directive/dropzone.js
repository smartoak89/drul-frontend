angular.module('app').directive('dropzoneImg', ['Conf', function(Conf) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var config = {
                url: Conf.api_path + '/file/9546e575-8645-4e6f-a273-9c0dc999fedf',
                maxFilesize: 10,
                parallelUploads: 20,
                thumbnailWidth: 80,
                thumbnailHeight: 80,
                acceptedFiles: 'image/*',
                previewsContainer: '#previewsContainer',
                previewTemplate: document.getElementById('previewsTemplate').innerHTML,
                autoProcessQueue: true
            };
            var eventHandlers = {
                'addedfile': function(file) {
                    scope.file = file;
                    if (this.files[1]!=null) {
                        this.removeFile(this.files[0]);
                    }
                    scope.$apply(function() {
                        scope.fileAdded = true;
                    });
                },

                'success': function (file, response) {
                }

            };

            var dropzone = new Dropzone(element[0], config);

            angular.forEach(eventHandlers, function(handler, event) {
                dropzone.on(event, handler);
            });

            scope.processDropzone = function() {
                dropzone.processQueue();
            };

            scope.resetDropzone = function() {
                dropzone.removeAllFiles();
            }
        }
    }
}]);