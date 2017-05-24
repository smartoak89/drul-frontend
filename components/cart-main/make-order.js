angular.module('app')
    .component('makeOrder', {
        templateUrl: "components/cart-main/make-order.html",
        bindings: {
            cost: '=',
            count: '=',
            order: '='
        },
        controller: ['Cart', 'User','OrderService', 'CurrencyService', '$anchorScroll', 'DeliveryService',
            function(Cart, User, OrderService, CurrencyService, $anchorScroll, DeliveryService) {
                var self = this;
                var user = User.get();
                self.cart = Cart;
                self.error = '';
                self.viewDeliery = false;
                self.currencyService = CurrencyService;
                self.deliveryService = DeliveryService;
                _deliveryCache = {};

                function deliveryCache(id, method) {
                    if (method) {
                        if (!_deliveryCache[id]) {
                            _deliveryCache[id] = {
                                amount: method.price.amount,
                                free: method.free
                            };
                            console.log('cache', _deliveryCache);
                        }
                    } else {
                        return _deliveryCache[id];
                    }
                }

                this.$onInit = function () {
                    self.orderSuccess = false;
                    self.orderMake = {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        country: user.country,
                        phone: user.phone,
                        email: user.email,
                        currency:  CurrencyService.cy,
                        products: [],
                        delivery: {}
                    };

                    DeliveryService.list();
                };



                self.orderFun = function(){
                    if (isValid() === true && isValid1() === true) {
                        var price = 0;
                        _.each(self.order, function (product, index) {
                            price = price + (product.price * product.counter);
                            console.log('productMake', product);
                            self.orderMake.products[index] = {
                                productID: product.product_uuid,
                                combo: product.combo,
                                count: product.counter,
                                price: product.price
                            }
                        });

                        self.orderMake.price = price;
                        // console.log(self.orderMake);
                        OrderService.doOrder(self.orderMake, function (err, res) {
                            if (err) return self.error = err.data.message;
                            Cart.clear();
                            $anchorScroll(0);
                            self.orderSuccess = true;
                        })
                    }
                };

                self.deliveryMethods = function () {
                    var countryMethods = self.deliveryService.methods.filter(function (m, i) {
                        if (m.country == self.orderMake.country) return m;
                    });

                    return countryMethods;

                };

                self.changeMethod = function () {
                    if (self.orderMake.delivery.method) {
                        var method = _.find(self.deliveryService.methods, {uuid: self.orderMake.delivery.method});
                        var methodCurrency = method.price.currency.toLowerCase();
                        var userCurrency = CurrencyService.cy.toLowerCase();

                        deliveryCache(method.uuid, method);

                        if (userCurrency !== methodCurrency) {


                            var methodCourse = CurrencyService.getCy(methodCurrency);

                            if (methodCurrency == 'usd') {
                                console.log('userCurrency', userCurrency);

                                if (userCurrency == 'uah'){
                                    method.price.amount = Math.round(deliveryCache(method.uuid).amount * methodCourse);
                                    method.free = Math.round(deliveryCache(method.uuid).free * methodCourse);
                                }

                                if (userCurrency == 'rur') {
                                    console.log('rur')
                                    var rurCourse = CurrencyService.getCy('rur');
                                    method.price.amount = Math.round((deliveryCache(method.uuid).amount * methodCourse) / rurCourse);
                                    method.free = Math.round((deliveryCache(method.uuid).free * methodCourse) / rurCourse);
                                }

                                if (userCurrency == 'usd'){
                                    console.log('usercur', 'usd')
                                    method.price.amount = deliveryCache(method.uuid).amount;
                                    method.free = deliveryCache(method.uuid).free;
                                }
                            } else if (methodCurrency == 'rur') {
                                console.log('rur')
                                if (userCurrency == 'uah'){
                                    method.price.amount = Math.round(deliveryCache(method.uuid).amount * methodCourse);
                                    method.free = Math.round(deliveryCache(method.uuid).free * methodCourse);
                                }
                                if (userCurrency == 'usd'){
                                    var usdCourse = CurrencyService.getCy('usd');
                                    method.price.amount = Math.round((deliveryCache(method.uuid).amount * methodCourse) / usdCourse);
                                    method.free = Math.round((deliveryCache(method.uuid).free * methodCourse) / usdCourse);
                                }
                                if (userCurrency == 'rur') {
                                    method.price.amount = deliveryCache(method.uuid).amount;
                                    method.free = deliveryCache(method.uuid).free;
                                }
                            } else if (methodCurrency == 'uah') {
                                if (userCurrency == 'usd'){
                                    var usdCourse = CurrencyService.getCy('usd');
                                    method.price.amount = Math.round(deliveryCache(method.uuid).amount  / usdCourse);
                                    method.free = Math.round(deliveryCache(method.uuid).free / usdCourse);
                                }
                                if (userCurrency == 'rur'){
                                    var rurCourse = CurrencyService.getCy('rur');
                                    method.price.amount = deliveryCache(method.uuid).amount  / rurCourse;
                                    method.free = deliveryCache(method.uuid).free / rurCourse;
                                }
                                if (userCurrency == 'uah'){
                                    method.price.amount = deliveryCache(method.uuid).amount;
                                    method.free = deliveryCache(method.uuid).free;
                                }
                            }
                        }

                        self.choosedMethod = method;
                        // console.log('method', self.choosedMethod)
                    }
                };

                function isValid() {
                    if (!self.orderMake.country) return self.error = 'Укажите страну получателя!';
                    if (!self.orderMake.firstname) return self.error = 'Укажите имя получателя!';
                    if (!self.orderMake.lastname) return self.error = 'Укажите фамилию получателя!';
                    if (!self.orderMake.phone) return self.error = 'Укажите мобильный номер получателя!';
                    if (self.orderMake.phone.length < 11 || self.orderMake.phone.length > 14) return self.error = 'Мобильный телефон введен некорректно!';
                    if (!self.orderMake.email) return self.error = 'Укажите email получателя!';
                    if (self.order.length <= 0) return self.error = 'Нет товаров для оформления!';
                    self.error = '';
                    return true;
                }

                function isValid1() {
                    if (!self.orderMake.delivery.method) return self.error1 = 'Выберете способ доставки!';
                    if (!self.orderMake.delivery.city) return self.error1 = 'Укажите город!';
                    if (!self.orderMake.delivery.numberPost) return self.error1 = 'Укажите номер отделения!';
                    if (!self.orderMake.delivery.street&&self.orderMake.delivery.onHome) return self.error1 = 'Укажите улицу доставки!';
                    if (!self.orderMake.delivery.house&&self.orderMake.delivery.onHome) return self.error1 = 'Укажите номер дома!';
                    if (!self.orderMake.delivery.flat&&self.orderMake.delivery.onHome) return self.error1 = 'Укажите номер квартиры!';
                    self.error1 = '';
                    return true;
                }
        }]
    });
