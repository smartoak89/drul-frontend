angular.module('app')
    .service('MainService', ['$rootScope', '$state', 'DeferredService', 'Cart', 'User', function ($rootScope, $state, DeferredService, Cart, User) {
        var self = this;

        this.activeUser = null;
        this.activeMenu = 0;

        this.init = function () {
            console.log('initService');
            DeferredService.list(function () {});
            Cart.list();
            self.activeUser = User.get();
        };

        this.deactivate = function () {
            self.activeUser = null;
            Cart.out();
            DeferredService.out();
        };

        $rootScope.$on('userActivate', function () {
            self.init();
        });

        $rootScope.$on('userDeactivate', function () {
            console.log('deactivate');
            self.deactivate();
        });

    }]);