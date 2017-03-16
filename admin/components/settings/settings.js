angular.module('admin')
    .component('settings', {
        templateUrl: "admin/components/settings/settings.html",
        controller: ['Conf', 'Goods', 'HttpResource', 'File', function(Conf, Goods, HttpResource, File) {
            var self = this;
            self.slides = [];
            // self.fields=[
            //     {name: 'Валюта', props: [
            //         {prop: 'Надбавка, %', type: 'inp'},
            //         {prop: 'Валюта по умолчанию', type: 'sel', opt:['UAH', 'RUB', 'DOL']}
            //     ]},
            //     {name: 'Доставка', props: [
            //         {prop: 'Цена доставки', type: 'inp'},
            //         {prop: 'Бесплатная доставка от', type: 'inp'}
            //     ]}
            // ];
            self.cur = null;
        }]
    });