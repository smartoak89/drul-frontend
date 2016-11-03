angular.module('admin')
    .component('stocks', {
        templateUrl: "admin/components/stocks/stocks.html",
        controller: ['Stocks',function(Stocks) {
            this.Stocks = Stocks;
        }]
    });