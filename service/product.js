angular.module('app')
    .factory('Product', ['Httpquery', '$http', '$cookies', '$q', 'Cart', 'User','$location', 'CurrencyService', 'ReviewsService', 'FileService', 'DeferredService',
        function (Httpquery, $http, $cookies, $q, Cart, User, $location, CurrencyService, ReviewsService, FileService, DeferredService) {

            var queryStr = {
                params1: 'products'
            };

            return {
                products: [],
                stocksList: null,
                curProd: null,
                searchValue: null,
                skip:0,

                getList: function (criteria, category) {
                    var self = this;

                    if (!criteria) queryStr = { params1: 'products' };

                    if (category) {
                        queryStr.category = category;
                    }else{
                        delete queryStr.category;
                    }

                    if(self.searchValue){
                        queryStr.article = self.searchValue;
                    }

                    criteria = criteria || {sort: 'created.desk'};

                    for (var key in criteria) {
                        queryStr[key] = criteria[key];
                    }

                   if (queryStr.skip == 0) delete queryStr.skip;

                    console.log('criteria', queryStr);

                    Httpquery.query(queryStr, function (res) {

                        _.each(res, function (product) {
                            DeferredService.wasDeferred(product);
                            CurrencyService.changePrice(product);
                        });

                        if (self.skip == 0) self.products = [];
                        self.products = self.products.concat(res);
                    }, function (err) {
                        console.error('Get products response', err);
                    })

                },
                showMore: function () {
                    this.skip += 1;
                    this.getList({skip: this.skip});
                },

                getProduct: function (id, callback) {
                    Httpquery.get({params1: 'product', params2: id}, function (res) {
                        ReviewsService.list(res);
                        FileService.listGallery(res);
                        callback(res);
                    }, function (err) {
                        console.error('Can\'t get one product =>', err);
                    });
                }
            }
        }]);