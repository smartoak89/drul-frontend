angular.module('app')
    .component('privatOffice', {
        templateUrl: "components/privat-office/privat-office.html",
        controller: ['Cart', function(Cart) {
            var self = this;
            self.counter = 0;
            self.countPlus = function(){
                self.counter++;
            };
            self.countMinus = function(){
                self.counter--;
            };

            this.cartList = Cart.list();

        }]
    });