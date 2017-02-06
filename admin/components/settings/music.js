angular.module('admin')
    .component('music', {
        templateUrl: "admin/components/settings/music.html",
        controller: ['FileUploader', 'Conf', 'MusicService', function(FileUploader, Conf, MusicService) {
            var self = this;
            this.musics = [];
            self.$onInit = function () {
                MusicService.list(function (err, res) {
                    if (err) return self.error = err.data.message;
                    self.musics = res;
                });
                uploaderInit();
            };

            self.remove = function (music) {
                MusicService.remove(music, function (err, result) {
                    if (err) self.error = err.message;
                    _.remove(self.musics, music);
                })
            };

            function uploaderInit () {
                uploader = self.uploader = new FileUploader({
                    url: Conf.api_path + '/file/music/music',
                    autoUpload: true
                });

                uploader.filters.push({
                    name: 'musicFilter',
                    fn: function(item) {
                        var audio = item.type.split('/')[0] == 'audio';
                        return audio ? true : false;
                    }
                });

                uploader.onAfterAddingAll = function () {
                    self.showUploadBtn = true;
                    _.each(uploader.queue, function(img){
                        img.alias = 'music';
                    });

                };

                uploader.onProgressItem = function () {
                    self.uploading = true;
                };

                uploader.onCompleteItem = function (c, res) {
                    self.musics.push(res[0]);
                };

                uploader.onCompleteAll = function () {
                    uploader.queue = [];
                    self.uploading = false;
                };

                self.addSliderMode = true;
            }
        }]
    });