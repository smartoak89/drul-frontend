angular.module('admin')
    .component('orderDetale', {
        templateUrl: "admin/components/orders/order-detale.html",
        controller: ['RequestService', 'HttpResource', '$location', 'Goods', '$timeout', 'Conf', 'CurrencyService', '$state', 'mailService', 'OrderService', 'DeliveryService', 'Templates',
            function(RequestService, HttpResource, $location, Goods, $timeout, Conf, CurrencyService, $state, mailService, OrderService, DeliveryService, Templates) {
                var self = this;
                self.Math = window.Math;
                var orderID = $location.$$path.split('/').pop();
                self.mail = {};
                self.editUserInfo = false;
                self.editOrderInfo = false;
                self.editOrderDetail = false;
                self.Conf = Conf;
                self.viewDeliery = false;
                self.currencyService = CurrencyService;
                self.deliveryService = DeliveryService;
                self.currencyService.getCourses();
                self.deliveryService.list();
                _deliveryCache = {};
                var disabled = null;

                RequestService.getOneOrder(orderID, function (err, res) {
                    if (err) return console.error(err);
                    res.delivery = res.delivery || {};
                    self.order = res;
                    self.newInfo = {
                        currency: res.currency,
                        email: res.email,
                        firstname: res.firstname,
                        lastname: res.lastname,
                        phone: res.phone,
                        price: res.price,
                        country : res.country,
                        status: res.status,
                        products: [],
                        delivery: {
                            method: res.delivery.method,
                            city: res.delivery.city,
                            numberPost: res.delivery.numberPost,
                            onHome: res.delivery.onHome,
                            street: res.delivery.street,
                            house: res.delivery.house,
                            flat: res.delivery.flat
                        }
                    };
                    _.each(res.products, function(elem, index){
                        self.newInfo.products[index] = {
                            combo: elem.combo,
                            count: elem.count,
                            price: self.Math.ceil(elem.price),
                            productID: elem.uuid
                        }
                    })
                    self.changeMethod();
                    self.curMethod = _.find(self.deliveryService.methods, {uuid: self.order.delivery.method});
                    self.checkFree();
                    prepareMail();
                });

                Templates.list(function(templatesList){
                    self.templatesList = templatesList;
                });

                self.applyTemplate = function(){
                    if(self.currentTemplate){
                        self.mail = {
                            subject: self.currentTemplate.subject,
                            body: self.currentTemplate.body,
                            email: self.order.email
                        }
                    }else{
                        self.mail = {
                            subject: '',
                            body: '',
                            email: ''
                        }
                    }
                }

                self.saveChanges = function(type){
                    if(type=='delivery'&&!self.newInfo.delivery.onHome){
                        self.newInfo.delivery.street = null;
                        self.newInfo.delivery.house = null;
                        self.newInfo.delivery.flat = null;
                    }
                    HttpResource.put({params1: 'order', params2: self.order.uuid}, self.newInfo, function(res){
                        if (self.newInfo.status !== self.order.status && self.order.email && self.order.email !== '') {
                            mailService.sendStatus(self.order.uuid)
                        }
                        $state.reload();
                    }, function(err){
                    });
                }

                self.pushProduct = function(prod, index){
                    Goods.product = prod;
                    Goods.productIndex = index;
                };

                self.removeOrder  = function(id, index){
                    RequestService.indexOrder = index;
                    RequestService.idOrder = id;
                    RequestService.returnToList = true;
                };

                self.searchProduct = function(txt) {
                    txt = txt.toLowerCase();
                    if (!txt) return self.searchProducts= null;
                    if (!disabled) {
                        disabled = true;
                        Goods.list({article: txt}, function (products) {
                            self.searchProducts = products;
                            disabled = false;
                        });
                    }
                };

                self.sendMail = function() {
                    if (!self.mail.subject) return self.error = 'Укажите тему сообщения';
                    if (!self.mail.body) return self.error = 'Укажите текст сообщения';
                    if (!self.mail.email) return self.error = 'Укажите электронный адрес';
                    self.error = null;
                    mailService.sendUser(self.mail, function (err, res) {
                        console.log(err);
                        if (err) return self.error = err.json();
                        self.mail.subject = '';
                        self.mail.text = '';
                        self.mail.email = '';
                        self.error = 'Сообщение отправлено успешно';
                    })
                };

                function prepareMail () {
                    self.mail.email = self.order.email;
                }

                self.checkFree = function(){
                    if (self.curMethod && self.curMethod.free > self.order.price){
                        self.deliveryCost=true;
                    }else{
                        self.deliveryCost=false;
                    }
                }

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

                self.deliveryMethods = function () {
                    var countryMethods = self.deliveryService.methods.filter(function (m, i) {
                        if (m.country == self.order.country) return m;
                    });

                    return countryMethods;

                };

                self.changeMethod = function () {
                    if (self.order.delivery.method) {
                        var method = _.find(self.deliveryService.methods, {uuid: self.order.delivery.method});
                        var methodCurrency = method.price.currency.toLowerCase();
                        var userCurrency = self.order.currency.toLowerCase();

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
                                    method.price.amount = Math.round(deliveryCache(method.uuid).amount);
                                    method.free = Math.round(deliveryCache(method.uuid).free);
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
                                    method.price.amount = Math.round(deliveryCache(method.uuid).amount);
                                    method.free = Math.round(deliveryCache(method.uuid).free);
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
                                    method.price.amount = Math.round(deliveryCache(method.uuid).amount);
                                    method.free = Math.round(deliveryCache(method.uuid).free);
                                }
                            }
                        }

                        self.choosedMethod = method;
                        self.newInfo.delivery.method =  method.uuid;
                        // console.log('method', self.choosedMethod)
                    }
                };


        }]
    });