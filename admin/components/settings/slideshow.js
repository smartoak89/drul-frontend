angular.module('admin')
    .component('slideshow', {
        templateUrl: "admin/components/settings/slideshow.html",
        controller: ['FileUploader', 'Conf', 'SlideshowService', '$timeout', function(FileUploader, Conf, SlideshowService, $timeout) {
            var self = this;

            self.slider = {};
            self.error;
            self.Conf = Conf;
            self.sliders = [];
            var uploader;
            var newSlider = false;

            self.$onInit = function () {
                listSliders();
            };

            this.save = function () {
                newSlider = false;
                validate(sanitize(self.slider), function (slider) {
                    if (uploader.queue.length > 0) {
                        self.uploading = true;
                        return uploader.uploadAll();
                    }
                    update();
                });
            };
            function update() {
                SlideshowService.update(self.slider, function(err, res) {
                    if (err) return self.error = err.message;
                    SlideshowService.getImage(res, function (slide) {
                        self.sliders[_.findIndex(self.sliders, {uuid: res.uuid})] = slide;
                        self.addSliderMode = false;
                    })
                });
            }
            this.update = function (slide) {
                self.slider = angular.copy(slide);
                uploaderInit ()
            };

            this.cancel = function () {
                if (newSlider) self.remove(self.slider);
                newSlider = false;
                self.addSliderMode = false;
                self.showUploadBtn = false;
                uploader.clearQueue();
            };

            self.remove = function (slide) {
                SlideshowService.remove(slide, function (err, result) {
                    if (err) self.error = err.message;
                    _.remove(self.sliders, slide);
                })
            };

            self.newSlider = function () {
                newSlider = true;
                SlideshowService.save({}, function(err, res) {
                    if (err) return self.error = err.message;
                    self.slider = res;
                    self.sliders.push(res);
                    uploaderInit();
                })
            };

            // Uploader
            function uploaderInit () {
                uploader = self.uploader = new FileUploader({
                    url: Conf.api_path + '/file/slider/' + self.slider.uuid,
                    queueLimit: 1
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

                uploader.onCompleteItem = function () {
                    console.log('arguments', arguments);
                };

                uploader.onCompleteAll = function () {
                    uploader.queue = [];
                    // self.uploading = false;
                    update();
                };

                self.addSliderMode = true;
            }

            function listSliders () {
                SlideshowService.list(function (err, sliders) {
                    if (err) return console.log(err);
                    _.each(sliders, function (slide) {
                        SlideshowService.getImage(slide, function (res) {
                            self.sliders.push(res);
                        });
                    })


                });
            }

            function validate (slider, callback) {
                // if (!slider.link && !slider.header && !slider.description) return self.error = 'Нет данных для сохранения!';
                callback(slider);
            }

            function sanitize(slider) {
                return {
                    uuid: slider.uuid,
                    link: slider.link,
                    header: slider.header,
                    description: slider.description
                }
            }

        }]
    });