angular.module('app')
    .service('MainService', ['$rootScope', 'DeferredService', 'Cart', function ($rootScope, DeferredService, Cart) {
        var self = this;

        this.init = function () {
            console.log('initService')
            DeferredService.list(function () {});
            Cart.list();
        };

        $rootScope.$on('userActivate', function () {
            self.init();
        })

    }]);