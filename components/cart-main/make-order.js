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
                    currency:  $cookies.get('currency') || 'UAH'
                }
            };

            self.orderFun = function(){
                if (isValid() === true) {
                    _.each(self.order, function (i) {
                        self.orderMake.count = i.counter;
                        self.orderMake.combo = i.combo;

                        OrderService.doOrder(i.product_uuid, self.orderMake, function (err, res) {
                            if (err) return self.error = err.data.message;
                            console.log('res', res);
                        })
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
