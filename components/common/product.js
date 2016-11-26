angular.module('app')
    .component('product', {
        templateUrl: "components/common/product.html",
        bindings: {
            product: '='
        },
        controller: ['$cookies', 'Cart', 'User','Product', function($cookies, Cart, User, Product) {
            var self = this;
            this.cart = Cart;
            this.product.currency = $cookies.get('currency');
            this.stocks = Product.stocksList;
            this.class = 'wrapB';
            this.class3 = 'wrapB';
            this.class1 = 's-2';
            this.class2 = 's-3';
            this.stockCost = null;
            this.curStock = null;
            self.User = User;
            this.addToCart = function () {
                var self = this;
                if (User.checkUser()) {
                    return Cart.save(self.product.uuid);
                }
                Cart.addToCart(this.product);
            }
            this.preview = this.product.photo || '';
            this.stockFun = function (per, price){
                self.stockCost = Product.countStock(per, price);
            };
            if(self.product.stock){
                if(_.find(self.stocks, {uuid: self.product.stock})) {
                    self.curStock = _.find(self.stocks, {uuid: self.product.stock});
                    this.stockFun(self.curStock.percent, self.product.price);
                }
            }else{
                self.curStock = null;
            }
        }]
    });