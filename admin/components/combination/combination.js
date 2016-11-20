angular.module('admin')
    .component('combination', {
        templateUrl: "admin/components/combination/combination.html",
        controller: ['Goods', function(Goods) {
            var self = this;
            this.combinations = Goods.listComb();
            this.show = function (combination) {
                _.each(self.combinations, function (i) {
                    if (i == combination) {
                        return combination.show = !combination.show;
                    }
                    return i.show = false;
                });
            };
            this.remove = function (comb) {
                console.info('Combination remove => ', comb);
                Goods.removeComb(comb, function (err) {
                    console.error('Remove Combination => ', err);
                })
            }

        }]
    });