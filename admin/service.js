angular.module('admin')
    // Httpquery
    .service('HttpResource', ['$resource', function ($resource) {
        return $resource('/api/:params1/:params2/:params3', {}, {
            put: {
                method: "PUT"
            }
        });
    }])
    // Product
    .factory('Goods',['HttpResource', '$location', function (HttpResource, $location) {
        return {
            products: null,
            editprod: null,
            product: null,
            productIndex: null,
            list: function () {
                var self = this;
                if (this.products == null) {
                    return HttpResource.query({params1: 'products'}, function (res) {
                        self.products = res;
                    })
                }
                return self.products;
            },
            get: function (id) {
                var self = this;
                HttpResource.query({params1: 'product', params2: id}, function (res) {
                    self.editprod = res;
                })
            },
            editLocal: function (product) {
                this.editprod = product;
                $location.url('/admin/goods/' + product.uuid)
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
            curIndex: null,
            curParent: null,
            curParentIndex: null
        }
    }])
    // Stocks
    .factory('Stocks', ['HttpResource', function (HttpResource) {
        return {
            stocksList: null,
            dateExpires: null,
            create: function (stocks, callback) {
                var self = this;
                stocks.expires = self.dateExpires;
                HttpResource.save({params1: 'stocks'}, stocks, function (res) {
                    self.stocksList.push(res);
                    callback();
                }, function (err) {
                    callback(err);
                })
            },
            list: function () {
                var self = this;
                if (self.stocksList == null) {
                    return HttpResource.query({params1: 'stocks'}, function (res) {
                        self.stocksList = res;
                    })
                }
                return self.stocksList;
            },
            remove: function (id, callback) {
                var self = this;
                HttpResource.delete({params1: 'stocks', params2: id}, function (res) {
                    _.remove(self.stocksList, {uuid: id});
                    console.log(res);
                    callback();
                }, function (err) {
                    callback(err);
                })
            }
        }
    }])
    // Users
    .factory('Users',['HttpResource', function (HttpResource) {
        return {
            listUsers: null,
            list: function () {
                var self = this;
                if (self.listUsers == null) {
                    return HttpResource.query({params1: 'users'}, function (res) {
                        self.listUsers = res;
                    })
                }
                return self.listUsers;
            },
            remove: function (id, callback) {
                var self = this;
                HttpResource.delete({params1: 'user', params2: id}, function (res) {
                    _.remove(self.listUsers, {uuid: id});
                    callback(null);
                }, function (err) {
                    callback(err);
                })
            },
            validate: function (user, callback) {
                var reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                if (!user.firstname) return callback('Пожалуйста введите имя!');
                if (!user.lastname) return callback('Пожалуйста введите Фамилию!');
                if (!user.email) return callback('Пожалуйста введите email!');
                if (!reg.test(user.email)) return callback('Некоректный email!');
                if (!user.phone) return callback('Пожалуйста введите номер телефона!');
                if (!user.password) return callback('Пожалуйста введите пароль!');
                if (user.password.length < 4) return callback('Пароль должен быть не менее 4 символов!');

                return callback(null);

            }
        }
    }]);
