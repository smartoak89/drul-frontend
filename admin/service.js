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
            combinations: null,
            list: function () {
                var self = this;
                if (this.products == null) {
                    return HttpResource.query({params1: 'products'}, function (res) {
                        angular.forEach(res, function (product) {
                           self.getGallery(product, function (err) {
                               if (err) console.trace('error', err);
                           })
                        });
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
            },
            update: function (product, callback) {
                HttpResource.put({params1: 'product', params2: product.uuid}, product, function (res) {
                    callback(null, res)
                }, function (err) {
                    callback(err);
                })
            },
            getGallery: function (product, callback) {
                var criteria = {
                    params1: 'files',
                    params2: product.uuid
                };
                HttpResource.query(criteria, function (res) {
                    product.photo = _.find(res, {type: 'main'});
                    product.gallery = res;
                    callback()
                }, function (err) {
                    callback(err);
                })
            },
            listComb: function () {
                var self = this;
                if (self.combinations == null) {
                    return HttpResource.query({params1: 'combinations'}, function (res) {
                        self.combinations = res;
                    })
                }
                return self.combinations;
            },
            removeComb: function (comb, callback) {
                var self = this;
                HttpResource.delete({params1: 'combination', params2: comb.uuid}, function (res) {
                    console.info('Combination deleted => ', res);
                    _.remove(self.combinations, comb);
                }, function (err) {
                    callback(err);
                })
            },
            addComb: function (comb, callback) {
                var self = this;
                HttpResource.save({params1: 'combination'}, comb, function (res) {
                    console.info('Combination created=> ', res);
                    callback();
                    self.combinations.push(res);
                }, function (err) {
                    console.info('Combination create error => ', err);
                    callback(err);
                })
            },
            updateComb: function (comb, index, callback) {
                var self = this;
                console.log('index', index);
                HttpResource.put({params1: 'combination', params2: comb.uuid}, comb, function (res) {
                    self.combinations.splice(index, 1, comb);
                    callback();
                }, function (err) {
                    console.info('Combination create error => ', err);
                    callback(err);
                })
            },
            removeCombChild: function (comb, indexChild, callback) {
                var self = this;
                var parentIndex = _.indexOf(self.combinations, _.find(self.combinations, {uuid: comb.uuid}));
                comb.value.splice(indexChild, 1);
                self.updateComb(comb, parentIndex, callback);
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
    }])
    // File
    .factory('File',['HttpResource', function (HttpResource) {
        return {
            remove: function (id, callback) {
                console.info(id);
                HttpResource.delete({params1: 'file', params2: id}, function (res) {
                    callback(null, res);
                }, function (err) {
                    callback(err);
                })
            }
        }
    }])

