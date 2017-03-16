angular.module('app')
    .service('MainService', ['$rootScope', '$state', 'DeferredService', 'Cart', 'User', 'CurrencyService', 'Product',
        function ($rootScope, $state, DeferredService, Cart, User, CurrencyService, Product) {
            var self = this;

            this.activeUser = null;
            this.activeMenu = 0;

            this.init = function () {
                console.log('initService');
                DeferredService.list(function () {});
                Cart.init();
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
                self.deactivate();
            });

            $rootScope.$on('currencyChanged', function () {
                Product.skip = 0;
                Product.getList({skip: 0});
            });

    }]);