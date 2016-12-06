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
    'panzoom'

]);
app.constant('Conf', {
   api_path: 'http://95.46.99.177/api'
});

app.run(['$location', '$state', '$rootScope', '$anchorScroll', 'User', 'Cart', 'Product', function($location, $state, $rootScope, $anchorScroll, User, Cart, Product) {
    User.init(function () {

    });
    $rootScope.$on('$locationChangeSuccess', function(event, toUrl) {
        $rootScope.URL = $location.url().split('/').pop();
        $anchorScroll(0);
    });
    // Product.changeCurrency();
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
        url: "product/:slug",
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
        resolve: {
            checkUserPermission: ['$location', 'User', function($location, User){
                if(!User.checkUser()){
                    $location.path('/');
                }
            }]
        }
    });
}]);