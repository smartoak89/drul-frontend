angular.module('admin')
    .component('adminNavigation', {
        templateUrl: "admin/components/common/admin-navigation.html",
        controller: [function() {
            var self = this;
            self.categs = [
                {name: 'Категории', url: 'admin.categoriesAdmin'},
                {name: 'Товары', url: 'admin.goodsAdmin'},
                {name: 'Пользователи', url: 'admin.usersAdmin'},
                {name: 'Заказы', url: 'admin.ordersAdmin'},
                {name: 'Акции', url: 'admin.stocksAdmin'},
                {name: 'Комбинации', url: 'admin.combination'},
                {name: 'Отзывы', url: 'admin.commentsAdmin'},
                {name: 'Способы доставки', url: 'admin.deliveryAdmin'},
                {name: 'Настройки', url: 'admin.settingsAdmin'}
            ]
        }]
    });