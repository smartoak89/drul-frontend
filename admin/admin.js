"use strict";

angular.module('admin', [
    'treeGrid',
    'ngResource',
    'ngPatternRestrict',
    'ngScrollbars',
    'treeControl'
])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $stateProvider.state('admin', {
            url: "/admin",
            views: {
                '': {template: "<template-admin></template-admin>"},
                'content': {template: "<main-admin-content></main-admin-content>"}
            }
        });
        $stateProvider.state('admin.categoriesAdmin', {
            url: "/categories",
            views: {
                '': {template: "<template-admin></template-admin>"},
                'content': {template: "<categories></categories>"}
            }
        });
        $stateProvider.state('admin.goodsAdmin', {
            url: "/goods",
            views: {
                '': {template: "<template-admin></template-admin>"},
                'content': {template: "<goods></goods>"}
            }
        });
        $stateProvider.state('admin.goodsEditor', {
            url: "/goods/:id",
            views: {
                '': {template: "<template-admin></template-admin>"},
                'content': {template: "<goods-editor></goods-editor>"}
            },
            resolve: {
                checkProductEditor: function (Goods, $location) {
                    if (Goods.editprod == null) {
                        Goods.get($location.url().split('/').pop());
                        // $location.url('/admin/goods');
                    }
                }
            }
        });
        $stateProvider.state('admin.combination', {
            url: "/combinations",
            views: {
                '': {template: "<template-admin></template-admin>"},
                'content': {template: "<combination></combination>"}
            }
        });
        $stateProvider.state('admin.usersAdmin', {
            url: "/users",
            views: {
                '': {template: "<template-admin></template-admin>"},
                'content': {template: "<users></users>"}
            }
        });
        $stateProvider.state('admin.requestsAdmin', {
            url: "/requests",
            views: {
                '': {template: "<template-admin></template-admin>"},
                'content': {template: "<requests></requests>"}
            }
        });
        $stateProvider.state('admin.stocksAdmin', {
            url: "/stocks",
            views: {
                '': {template: "<template-admin></template-admin>"},
                'content': {template: "<stocks></stocks>"}
            }
        });
        $stateProvider.state('admin.settingsAdmin', {
            url: "/settings",
            views: {
                '': {template: "<template-admin></template-admin>"},
                'content': {template: "<settings></settings>"}
            }
        });
        $stateProvider.state('admin.deliveryAdmin', {
            url: "/delivery",
            views: {
                '': {template: "<template-admin></template-admin>"},
                'content': {template: "<delivery></delivery>"}
            }
        });
        $stateProvider.state('admin.commentsAdmin', {
            url: "/comments",
            views: {
                '': {template: "<template-admin></template-admin>"},
                'content': {template: "<comments></comments>"}
            }
        });

    }]);