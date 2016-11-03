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