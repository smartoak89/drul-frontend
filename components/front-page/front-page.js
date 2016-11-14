angular.module('app')
    .component('frontContent', {
        templateUrl: "components/front-page/front-page.html",
        controller: ['Product', 'Cart', function(Product, Cart) {
            var self = this;
            this.$onInit = function () {
                self.products = Product.getList();
                self.def = Cart.listDef();
                console.log(self.def[0])
                _.forEach(self.products, function(elem){
                    console.log("adfafd");
                    console.log(_.find(self.def, {'uuid': elem.uuid}));
                    //if (_.find(self.def['uuid', elem.uuid])){
                    //    elem.def=true;
                    //}
                });

            };

        }]
    });