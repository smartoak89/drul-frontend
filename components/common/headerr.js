angular.module('app')
    .component('headerr', {
        templateUrl: "components/common/headerr.html",
        controller: ['User', 'Cart', function(User, Cart) {
            this.User = User;
            this.Cart = Cart;
            //this.lenCart = Cart.cartList.length;
            this.lenDef = Cart.defList;
            console.log(this.lenDef);
            this.logout = function () {
                // this.user = null;
                User.deactive();
            };
            this.click = function () {
                User.set({id: 92873928219});
            }
        }]
    });