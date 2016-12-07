angular.module('admin')
    .component('stocks', {
        templateUrl: "admin/components/stocks/stocks.html",
        controller: ['Stocks',function(Stocks) {
            var self = this;
            this.$onInit = function () {
                Stocks.list(function(stocksList){
                    self.stocksList = stocksList;
                })
            }
        }]
    });