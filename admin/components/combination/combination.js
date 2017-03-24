angular.module('admin')
    .component('combination', {
        templateUrl: "admin/components/combination/combination.html",
        controller: ['Goods', function(Goods) {
            var self = this;
            Goods.listComb(function(combinations){
                self.combinations = combinations;
            });
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

            function showError (err) {

            }

        }]
    });