angular.module('app')
    .component('cartMain', {
        templateUrl: "components/cart-main/cart-main.html",
        controller: ['$cookies', '$state', '$rootScope', 'Cart', 'User', '$timeout', '$anchorScroll', 'CurrencyService', 'Conf',
            function($cookies, $state, $rootScope, Cart, User, $timeout, $anchorScroll, CurrencyService, Conf) {
                var self = this;
                self.Conf = Conf;

                self.currencyService = CurrencyService;
                self.user = User.get();

                self.$onInit = function() {
                    getList();
                };

                self.countPlus = function(i){
                    self.cartList[i].counter++;
                };
                self.countMinus = function(i){
                        self.cartList[i].counter--;
                        self.checkMinus(i);
                };
                self.checkMinus = function(i){
                    if(self.cartList[i].counter < 1) {
                        self.cartList[i].counter = 1;
                    }

                };
                self.remove = function (product) {
                  Cart.remove(product, function (err, res) {
                      if (err) return console.error(err);
                  })
                };
                self.clickToMod = function () {
                    $timeout(function() {
                        angular.element('#toMod').triggerHandler('click');
                    });
                };
                self.makeOrder = function() {
                    if (!self.user) return self.clickToMod();

                    $anchorScroll(0);
                    self.count = 0;
                    self.cost = 0;
                    for (var i = 0; i < self.cartList.length; i++) {
                        self.count = self.count + self.cartList[i].counter;
                        self.cost = self.cost + self.cartList[i].price * self.cartList[i].counter;
                    }

                    $cookies.put('order', JSON.stringify({order: self.cartList, count: self.count, cost: self.cost, currency: self.currencyService.cy}))
                    $state.go('index.order');
                };

                function getList () {
                    Cart.list(function (res) {
                        self.cartList = res;
                    })
                }

                $rootScope.$on('currencyChanged', function () {
                    getList();
                })
        }]
    });