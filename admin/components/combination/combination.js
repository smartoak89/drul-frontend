angular.module('admin')
    .component('combination', {
        templateUrl: "admin/components/combination/combination.html",
        controller: ['Goods', function(Goods) {
            var self = this;
            self.combinations = Goods.combinations;
            Goods.listComb().then(function(){
                self.combinations = Goods.combinations;
                console.log(self.combinations);
            });
            this.show = function (comb) {
                comb.show = !comb.show;
                // _.each(self.combinations, function (i) {
                //     if (i == combination) {
                //         return combination.show = !combination.show;
                //     }
                //     return i.show = false;
                // });
            };
            this.remove = function (comb) {
                console.info('Combination remove => ', comb);
                Goods.removeComb(comb, function (err) {
                    if (err) return showError(err);
                })
            };
            this.removeChild = function (comb, index) {
                console.info('Remove child => ', index);
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

            function showError (err) {
                console.error('Response error', err)
            }

        }]
    });