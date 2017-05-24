angular.module('admin')
    .component('orderDetale', {
        templateUrl: "admin/components/orders/order-detale.html",
        controller: ['RequestService', 'HttpResource', '$location', 'Goods', '$timeout', 'Conf', 'CurrencyService', '$state', 'mailService',
            function(RequestService, HttpResource, $location, Goods, $timeout, Conf, CurrencyService, $state, mailService) {
                var self = this;
                var orderID = $location.$$path.split('/').pop();
                self.mail = {};
                self.editUserInfo = false;
                self.editOrderInfo = false;
                self.editOrderDetail = false;
                self.Conf = Conf;
                var disabled = null;

                RequestService.getOneOrder(orderID, function (err, res) {
                    if (err) return console.error(err);
                    self.order = res;
                    console.log(self.order);
                    self.newInfo = {
                        currency: res.currency,
                        email: res.email,
                        firstname: res.firstname,
                        lastname: res.lastname,
                        phone: res.phone,
                        price: res.price,
                        state: res.state,
                        status: res.status,
                        products: []
                    };
                    _.each(res.products, function(elem, index){
                        self.newInfo.products[index] = {
                            combo: elem.combo,
                            count: elem.count,
                            price: elem.price,
                            productID: elem.uuid
                        }
                    })

                    prepareMail();
                });

                self.saveChanges = function(type){
                    HttpResource.put({params1: 'order', params2: self.order.uuid}, self.newInfo, function(res){
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
                }

                self.sendMail = function() {
                    if (!self.mail.subject) return self.error = 'Укажите тему сообщения';
                    if (!self.mail.text) return self.error = 'Укажите текст сообщения';
                    self.error = null;
                    mailService.send(self.mail, function (err, res) {
                        if (err) return self.error = err;
                        self.mail.subject = '';
                        self.mail.text = '';
                        self.error = 'Сообщение отправлено успешно';
                    })
                };

                function prepareMail () {
                    self.mail.email = self.order.email;
                }



        }]
    });