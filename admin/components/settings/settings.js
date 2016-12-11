angular.module('admin')
    .component('settings', {
        templateUrl: "admin/components/settings/settings.html",
        controller: ['Currency', 'FileUploader', 'Conf', 'Goods', function(Currency, FileUploader, Conf, Goods) {
            var self = this;
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

            // Uploader
            var uploader = this.uploader = new FileUploader({
                url: Conf.api_path + '/file/78d56607-fc11-41eb-a60d-fcfb3b3cb797'
            });
            uploader.onAfterAddingAll = function () {
                _.each(uploader.queue, function(img){
                    img.alias = 'slide';
                    console.log(img);
                })
                console.log(uploader);

            };
            uploader.onCompleteAll = function () {
                console.log('done')
                self.editMode = false;
            };
            self.uploadSlide = function(){
                console.log('+')
                uploader.uploadAll();
            }

        }]
    });