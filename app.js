"use strict";

var app = angular.module('app', [
    'ui.router',
    'admin',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap',
    'ngResource',
    'ui.select',
    'rzModule',
    'ngCookies',
    'ngScrollbars',
    'angularFileUpload',
    'angularSoundManager',
    'angularQueryParams',
    'panzoom',
    'ezplus',
    'ngPatternRestrict'
]);

app.constant('Conf', {
    api_path: 'http://localhost/api',
    site_url: 'http://localhost'
});

app.run(['User', '$location', '$state', '$rootScope', '$anchorScroll', 'MainService', function(User, $location, $state, $rootScope, $anchorScroll, MainService) {

    $rootScope.$on('$stateChangeStart', function (event, toState) {
        var adminPermission;
        var adminSection = $rootScope.adminSection = ($location.path().search('admin-panel') == -1) == false;

        var activeUser = User.get();

        adminPermission = User.isAdmin();

        var forbidden;

        if (toState.url == 'privat-office'  && !activeUser) forbidden = true;

        if (adminSection && !adminPermission || forbidden) {
            $rootScope.toUrl = toState.url;
            $location.path('/not-allowed');
        }

    });

    $rootScope.$on('$locationChangeSuccess', function(event, toUrl) {
        $rootScope.URL = $location.url().split('/').pop();
        $anchorScroll(0);
    });

    MainService.init();
}]);

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

        $stateProvider.state('index', {
            url: "/",
            views: {
                '': {template: "<template-common></template-common>"},
                'content@index': {template: "<front-content></front-content>"}
            }
        });

        $stateProvider.state('index.about', {
            url: "about",
            views: {
                '': {template: "<template-common></template-common>"},
                'content': {template: "<about></about>"}
            }
        });

        $stateProvider.state('index.cartMain', {
            url: "cart",
            views: {
                '': {template: "<template-common></template-common>"},
                'content': {template: "<cart-main></cart-main>"}
            }
        });

        $stateProvider.state('index.filterPage', {
            url: "category/:top",
            views: {
                '': {template: "<template-common></template-common>"},
                'content': {template: "<filter-page></filter-page>"}
            }
        });

        $stateProvider.state('index.filterPage2', {
            url: "category/:top/:middle",
            views: {
                '': {template: "<template-common></template-common>"},
                'content': {template: "<filter-page></filter-page>"}
            }
        });

        $stateProvider.state('index.filterPage3', {
            url: "category/:top/:middle/:bottom",
            views: {
                '': {template: "<template-common></template-common>"},
                'content': {template: "<filter-page></filter-page>"}
            }
        });

        $stateProvider.state('index.product', {
            url: "product/:id",
            views: {
                '': {template: "<template-common></template-common>"},
                'content': {template: "<product-detail></product-detail>"}
            }
        });

        $stateProvider.state('index.privat-office', {
            url: "privat-office",
            views: {
                '': {template: "<template-common></template-common>"},
                'content': {template: "<privat-office></privat-office>"}
            }
        });
        $stateProvider.state('index.reset', {
            url: "reset/:id",
            views: {
                '': {template: "<template-common></template-common>"},
                'content': {template: "<reset-page></reset-page>"}
            }
        });
        $stateProvider.state('index.not-allowed', {
            url: "not-allowed",
            views: {
                '': {template: "<template-common></template-common>"},
                'content': {template: "<not-allowed></not-allowed>"}
            }
        });

        $urlRouterProvider.otherwise('/');

        $httpProvider.interceptors.push('RequestIntercepror');

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
}]);
