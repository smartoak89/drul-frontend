angular.module('admin')
    // Httpquery
    .service('HttpResource', ['$resource', function ($resource) {
        return $resource('/api/:params1/:params2', {}, {
            put: {
                method: "PUT"
            }
        });
    }])
    // Product
    .factory('Goods',['HttpResource', function (HttpResource) {
        return {
            products: null,
            list: function () {
                var self = this;
                if (this.products == null) {
                    return HttpResource.query({params1: 'products'}, function (res) {
                        self.products = res;
                    })
                }
                return self.products;
            }
        }
    }])
    // Categories
    .factory('Categories',['HttpResource', function (HttpResource) {
        return {
            categories: null,
            list: function () {
                var self = this;
                if (self.categories == null) {
                    return HttpResource.query({params1: 'categories'}, function (res) {
                        self.categories = res;
                        console.log(self.categories);
                    })
                }
                return self.categories;
            },
            curCategory: null,
            curIndex: null
        }
    }])
    // Stocks
    .factory('Stocks', ['HttpResource', function (HttpResource) {
        return {
            stocksList: [],
            dateExpires: null,
            create: function (stocks, error) {
                var self = this;
                stocks.expires = self.dateExpires;
                HttpResource.save({params1: 'stocks'}, stocks, function (res) {
                    console.log('res', res);
                    self.stocksList.push(res);
                }, error)
            }
        }
    }]);