angular.module('admin')
    .component('slider', {
        templateUrl: "admin/components/settings/sliders.html",
        controller: ['FileUploader', 'Conf', 'SliderService', function(FileUploader, Conf, SliderService) {
            var self = this;

            this.save = function () {
                self.addSliderMode = false;
            }

            this.cancel = function () {
                self.addSliderMode = false;
                self.showUploadBtn = false;
                uploader.clearQueue();
            };
            self.slides = []

            self.getSlider = function(){
                self.slides = [];
                HttpResource.query({params1:'files', params2:'5f0eeb5f-3fd7-4932-8ea8-3abf1578242c'}, function (res) {
                    _.forEach(res, function(obj){
                        if(obj.type == 'slide'){
                            self.slides.push(obj);
                        }
                    });
                    console.log('prodGall ', self.slides);
                }, function (err) {
                    console.error('Get gallery => ', err);
                })
            };

            self.remove = function (file) {
                File.remove(file.uuid, function (err, res) {
                    if (err) return self.error = err;
                    console.info('file was removed', res);

                    _.remove(self.slides, file);
                })
            };

            // Uploader
            var uploader = this.uploader = new FileUploader({
                url: Conf.api_path + '/file/slider/5f0eeb5f-3fd7-4932-8ea8-3abf1578242c'
            });

            uploader.filters.push({
                name: 'imgFilter',
                fn: function(item) {
                    var image = item.type.split('/')[0] == 'image';
                    return image ? true : false;
                }
            });

            uploader.onAfterAddingAll = function () {
                self.showUploadBtn = true;
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
                console.log(self.uploading);
                uploader.uploadAll();
            };

            self.$onInit = function () {
                self.getSlider();
            };
        }]
    });