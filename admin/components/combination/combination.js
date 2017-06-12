angular.module('admin')
    .component('combination', {
        templateUrl: "admin/components/combination/combination.html",
        controller: ['Goods', 'Vendors', function(Goods, Vendors) {
            var self = this;
            self.editChild = [];
            Goods.listComb(function(combinations){
                self.combinations = combinations;
                console.log(combinations);
                angular.forEach(combinations, function (item) {
                    self.editChild[item.slug] = [];
                    angular.forEach(item.value, function (it, index) {
                        self.editChild[item.slug][index] = {show: false, newValue: it};
                    })
                });
            });
            Vendors.getVendors(function(err, res){
                if(err){console.log(err)}
                else{
                    console.log(res);
                    self.vendor = res;
                }
            });
            this.removeVendor = function(index){
                self.vendor.value.splice(index, 1);
                Vendors.putVendor(self.vendor, function(err){
                    if (err) return showError(err);
                })
            };

            this.show = function (comb) {
                comb.show = !comb.show;
            };
            this.remove = function (comb) {
                Goods.removeComb(comb, function (err) {
                    if (err) return showError(err);
                })
            };
            this.removeChild = function (comb, index) {
                Goods.removeCombChild(comb, index, function (err) {
                    if (err) return showError(err);
                })
            };
            this.changeComb = function (comb, index) {
                if (comb.edit) {
                    delete comb.edit;
                    Goods.updateComb(comb, index, function (err) {
                        if (err) {
                            return showError(err)
                        }
                        return comb.edit = false;
                    });
                }
                angular.forEach(self.combinations, function (item) {
                    item.edit = false;
                });
                comb.edit = true;
            };

            this.changeCombChild = function (comb, value, index) {
                var self = this;
                // console.log(self.editChild.razmer);
                if (self.editChild[comb.slug][index].show) {
                    Goods.updateCombChild(comb, self.editChild[comb.slug][index].newValue, index, function (err) {
                        if (err) {
                            return showError(err)
                        }
                        comb.value[index] = self.editChild[comb.slug][index].newValue;
                        return self.editChild[comb.slug][index].show = false;
                    });
                }
                angular.forEach(self.editChild[comb.slug], function (item) {
                    item.show = false;
                });
                self.editChild[comb.slug][index].show = true;
            };

            function showError (err) {

            }

        }]
    });