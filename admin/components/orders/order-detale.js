angular.module('admin')
    .component('orderDetale', {
        templateUrl: "admin/components/orders/order-detale.html",
        controller: ['RequestService', 'HttpResource', '$location', 'Goods', '$timeout', 'Conf', 'CurrencyService', '$state', function(RequestService, HttpResource, $location, Goods, $timeout, Conf, CurrencyService, $state) {
            var self = this;
            var orderID = $location.$$path.split('/').pop();

            self.editUserInfo = false;
            self.editOrderInfo = false;
            self.Conf = Conf;

            RequestService.getOneOrder(orderID, function (err, res) {
                self.order = res;

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
                    //self.order.products[index] = {
                    //    productID: elem.uuid
                    //}
                })
            });

            self.saveChanges = function(type){
                HttpResource.put({params1: 'order', params2: self.order.uuid}, self.newInfo, function(res){
                    //if(type == 'user'){
                    //    self.order.firstname = res.firstname;
                    //    self.order.lastname = res.lastname;
                    //    self.order.email = res.email;
                    //    self.order.state = res.state;
                    //    self.order.phone = res.phone;
                    //    self.editUserInfo = false;
                    //}else if (type=='order'){
                    //    self.order.currency = res.currency;
                    //    self.order.status = res.status;
                    //    self.editOrderInfo = false;
                    //}
                    $state.reload();
                }, function(err){
                    console.log(err)
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

            var disabled = null;

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

            self.newOrderProd = function(product){
                console.log(product)
            }

        }]
    });