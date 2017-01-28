angular.module('admin')
    .component('settings', {
        templateUrl: "admin/components/settings/settings.html",
        controller: ['Currency', 'Conf', 'Goods', 'HttpResource', 'File', function(Currency, Conf, Goods, HttpResource, File) {
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

            self.$onInit = function () {
                self.getSlider();
            };
        }]
    });