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
   api_path: 'http://95.46.99.177/api'
});

app.run(['User', '$location', '$state', '$rootScope', '$anchorScroll', function(User, $location, $state, $rootScope, $anchorScroll) {

    $rootScope.$on('$stateChangeStart', function () {
        var adminPermission;
        var adminSection = $rootScope.adminSection = ($location.path().search('admin') == -1) == false;

        var activeUser = User.get();

        if (activeUser !== null && activeUser.permission) {
            adminPermission = (activeUser.permission.indexOf('administrator') == -1) == false;
        }
        //
        // if (adminSection && !adminPermission) {
        //     $location.path('/not-allowed');
        // }
    });

    $rootScope.$on('$locationChangeSuccess', function(event, toUrl) {
        $rootScope.URL = $location.url().split('/').pop();
        $anchorScroll(0);
    });
}]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

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
        url: "category/:name",
        views: {
            '': {template: "<template-common></template-common>"},
            'content': {template: "<filter-page></filter-page>"}
        }
        // resolve: {
        //     checkCateg: ['$location', 'Category', function($location, Category){
        //         var categ = Category.getList();
        //         var currentCateg = _.find(categ, {name: $location.path().split('/').pop()});
        //         if(!currentCateg){
        //             $location.path('/');
        //         }
        //     }]
        // }
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
        },
        // resolve: {
        //     checkUserPermission: ['$location', 'User', function($location, User){
        //         if(!User.checkUser()){
        //             $location.path('/');
        //         }
        //     }]
        // }
    });
    $stateProvider.state('not-allowed', {
        url: "/not-allowed",
        views: {
            '': {template: "<template-common></template-common>"},
            'content@index': {template: "<front-content></front-content>"}
        }
    });
}]);