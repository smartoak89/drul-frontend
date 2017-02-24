angular.module('app')
    .component('product', {
        templateUrl: "components/common/product.html",
        bindings: {
            product: '='
        },
        controller: ['$cookies', 'Cart', 'User','Product','Conf', function($cookies, Cart, User, Product, Conf) {

            var self = this;
            this.cart = Cart;
            this.product.currency = $cookies.get('currency');
            this.stocks = Product.stocksList;
            this.class = 'wrapB';
            this.class3 = 'wrapB';
            this.class1 = 's-2';
            this.class2 = 's-3';
            self.User = User;
            self.Conf = Conf;
            this.addToCart = function () {
                var self = this;
                if (User.checkUser()) {
                    return Cart.save(self.product.uuid);
                }
                Cart.addToCart(this.product);
            }
            // this.preview = this.product.photo || '';

            // if(self.product.stock){
            //     if(_.find(self.stocks, {uuid: self.product.stock})) {
            //         self.curStock = _.find(self.stocks, {uuid: self.product.stock});
            //         console.log(self.curStock);
            //         this.stockFun(self.curStock.percent, self.product.price);
            //     }
            // }else{
            //     self.curStock = null;
            // }
        }]
    });