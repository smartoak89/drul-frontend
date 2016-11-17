angular.module('admin')
    .component('combination', {
        templateUrl: "admin/components/combination/combination.html",
        controller: ['Goods', function(Goods) {
            var self = this;
            this.combinations = Goods.combinationsList();
            this.show = function (combination) {
                _.each(self.combinations, function (i) {
                    if (i == combination) {
                        return combination.show = !combination.show;
                    }
                    return i.show = false;
                });
            }

        }]
    });