angular.module('app')
    .component('makeOrder', {
        templateUrl: "components/cart-main/make-order.html",
        bindings: {
            cost: '=',
            count: '=',
            order: '='
        },
        controller: ['Cart', 'User','OrderService', '$cookies', '$anchorScroll', function(Cart, User, OrderService, $cookies, $anchorScroll) {
            var self = this;
            var user = User.get();
            self.cart = Cart;
            self.error = '';

            this.$onInit = function () {
                self.orderSuccess = false;
                self.orderMake = {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    state: user.state,
                    phone: user.phone,
                    email: user.email,
                    currency:  $cookies.get('currency') || 'UAH',
                    products: []
                }
            };

            self.orderFun = function(){
                if (isValid() === true) {
                    var price = 0;
                    _.each(self.order, function (product, index) {
                        price = price + (product.price * product.counter);
                        console.log('productMake', product);
                        self.orderMake.products[index] = {
                            productID: product.uuid,
                            combo: product.combo,
                            count: product.counter,
                            price: product.price
                        }
                    });

                    self.orderMake.price = price;

                    console.log(self.orderMake);

                    OrderService.doOrder(self.orderMake, function (err, res) {
                        if (err) return self.error = err.data.message;
                        Cart.clearCart();
                        $anchorScroll(0);
                        self.orderSuccess = true;
                    })
                }
            };

            function isValid() {
                if (!self.orderMake.state) return self.error = 'Укажите страну получателя!';
                if (!self.orderMake.firstname) return self.error = 'Укажите имя получателя!';
                if (!self.orderMake.lastname) return self.error = 'Укажите фамилию получателя!';
                if (!self.orderMake.phone) return self.error = 'Укажите мобильный номер получателя!';
                if (!self.orderMake.email) return self.error = 'Укажите email получателя!';
                if (self.order.length <= 0) return self.error = 'Нет товаров для оформления!';
                self.error = '';
                return true;
            }
        }]
    });
