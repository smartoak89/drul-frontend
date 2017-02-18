angular.module('app')
    .component('makeOrder', {
        templateUrl: "components/cart-main/make-order.html",
        bindings: {
            cost: '=',
            count: '=',
            order: '='
        },
        controller: ['Cart', 'User','OrderService', '$cookies', function(Cart, User, OrderService, $cookies) {
            var self = this;
            self.user = User;
            self.cart = Cart;
            self.error = '';

            this.$onInit = function () {
                self.orderMake = {
                    firstname: self.user.active.firstname,
                    lastname: self.user.active.lastname,
                    state: self.user.active.state,
                    phone: self.user.active.phone,
                    email: self.user.active.email,
                    currency:  $cookies.get('currency') || 'UAH',
                    products: []
                }
            };

            self.orderFun = function(){
                if (isValid() === true) {
                    var price = 0;
                    _.each(self.order, function (product, index) {
                        price = price + (product.price * product.counter);
                        // console.log('price', product.price);
                        // console.log('price', product.price);
                        self.orderMake.products[index] = {
                            productID: product.product_uuid,
                            combo: product.combo,
                            count: product.counter,
                            price: product.price
                        }
                    });

                    self.orderMake.price = price;

                    OrderService.doOrder(self.orderMake, function (err, res) {
                        if (err) return self.error = err.data.message;
                        console.log('res order', res);
                        Cart.clearCart();
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
