angular.module('admin')
    .component('stocks', {
        templateUrl: "admin/components/stocks/stocks.html",
        controller: ['Stocks',function(Stocks) {
            this.stocksList = Stocks.list();
        }]
    });