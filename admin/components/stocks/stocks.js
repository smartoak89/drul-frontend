angular.module('admin')
    .component('stocks', {
        templateUrl: "admin/components/stocks/stocks.html",
        controller: ['Stocks',function(Stocks) {
            Stocks.list().then(function(){
                this.stocksList = Stocks.stocksList;
            })
        }]
    });