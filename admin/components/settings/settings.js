angular.module('admin')
    .component('settings', {
        templateUrl: "admin/components/settings/settings.html",
        controller: ['Currency', 'FileUploader', 'Conf', 'Goods', 'HttpResource', 'File', function(Currency, FileUploader, Conf, Goods, HttpResource, File) {
            var self = this;
            self.slides = [];
            self.fields=[
                {name: 'Валюта', props: [
                    {prop: 'Надбавка, %', type: 'inp'},
                    {prop: 'Валюта по умолчанию', type: 'sel', opt:['UAH', 'RUB', 'DOL']}
                ]},
                {name: 'Музыка', props: [
                    {prop: 'Автовоспроизведние', type: 'check'}
                ]},
                {name: 'Доставка', props: [
                    {prop: 'Цена доставки', type: 'inp'},
                    {prop: 'Бесплатная доставка от', type: 'inp'}
                ]}
            ];
            self.cur = Currency.getCurrentCourse();
            console.log(self.cur);

            self.getSlider = function(){
                self.slides = [];
                HttpResource.query({params1:'files', params2:'78d56607-fc11-41eb-a60d-fcfb3b3cb797'}, function (res) {
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
                url: Conf.api_path + '/file/78d56607-fc11-41eb-a60d-fcfb3b3cb797'
            });
            uploader.onAfterAddingAll = function () {
                _.each(uploader.queue, function(img){
                    img.alias = 'slide';
                    console.log(img);
                });
                console.log(uploader);

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