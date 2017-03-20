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
                {name: 'Комментарии', url: 'admin.commentsAdmin'},
                {name: 'Комбинации', url: 'admin.combination'},
                {name: 'Настройки', url: 'admin.settingsAdmin'}
            ]
        }]
    });