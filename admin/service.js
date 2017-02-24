angular.module('admin')
    // Httpquery
    .service('HttpResource', ['$resource', 'Conf', function ($resource, Conf) {
        return $resource(Conf.api_path + '/:params1/:params2/:params3', {}, {
            put: {
                method: "PUT"
            }
        });
    }])
    // Product
    .factory('Goods',['HttpResource', '$location', '$q', 'Stocks', function (HttpResource, $location, $q, Stocks) {
        return {
            products: null,
            editprod: null,
            product: null,
            productIndex: null,
            combinations: [],
            selectedArr: [],
            list: function (parameters, callback) {
                var self = this;

                var criteria = {params1: 'products'};

                if (parameters) {
                    for (var key in parameters) {
                        criteria[key] = parameters[key];
                    }
                }

                HttpResource.query(criteria, function (res) {
                    angular.forEach(res, function (product) {
                       self.getGallery(product);
                    });

                    callback(res);
                });
            },
            add: function (product, callback) {
                var self = this;
                HttpResource.save({params1: 'product'}, product, function (res) {
                    console.log('added product', res);
                    self.editLocal(res);
                    self.products.push(product);
                    callback();
                }, function (err) {
                    callback(err);
                })
            },
            get: function (id) {
                var self = this;
                if (self.editprod) return;
                HttpResource.get({params1: 'product', params2: id}, function (res) {
                    self.getGallery(res);
                    self.editprod = res;
                }, function (err) {
                    console.error('Get one product => ',err);
                })
            },
            getThisProd: function (id) {
                var self = this;
                return HttpResource.get({params1: 'product', params2: id}, function (res) {
                    //self.getGallery(res);
                    console.log(res)
                    //self.product = res;
                }, function (err) {
                    console.error('Get one product => ',err);
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
            getGallery: function (product) {
                var criteria = {
                    params1: 'files',
                    params2: product.uuid
                };
                HttpResource.query(criteria, function (res) {
                    if (res.length > 0) {
                        product.photo = _.find(res, {type: 'main'});
                        product.gallery = res;
                    }
                }, function (err) {
                    console.error('Get gallery => ', err);
                })
            },
            getMainPhoto: function(id){
                var self = this;
                return  HttpResource.query({params1: 'files', params2: id, type: "main"}, function (res) {
                    console.log(res)
                }, function (err) {
                    console.error('Get one photo => ',err);
                })
            },
            listComb: function (callback) {
                var self = this;
                if (self.combinations.length == 0) {
                    HttpResource.query({params1: 'combinations'}, function (res) {
                        self.combinations = res;
                        callback(res)
                    }, function (err) {
                        console.error('Get combinations => ', err);
                    })
                } else {
                    callback(self.combinations);
                }
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
            },
            applyStock: function (product){
                var stock = _.find(Stocks.stocksList, {uuid: product.stock});
                product.stockCost = Math.round(product.price - ( product.price * stock.percent / 100 ));
            },
            getCom: function(product){
                HttpResource.query({params1: 'reviews', params2:product.uuid}, function(res){
                    product.comments = res;
                });
            },
            search: function (parameters, callback) {

                var criteria = {
                    params1: 'products'
                };

                for (var key in parameters) {
                    criteria[key] = parameters[key];
                }

                HttpResource.query(criteria, function (res) {
                    callback(res);
                }, function (err) {
                    callback(err);
                })
            }
        }
    }])
    // Categories
    .factory('Categories',['HttpResource', '$q', function (HttpResource, $q) {
        return {
            categories: [],
            list: function (callback) {
                var self = this;
                if (self.categories.length == 0) {
                    HttpResource.query({params1: 'categories'}, function (res) {
                        self.categories = res;
                        callback(res);
                    }, function (err) {
                        console.error('Load list of categories', err);
                    });
                } else {
                    callback(self.categories)
                }
            },
            curCategory: null,
            curIndex: null,
            curParent: null,
            curParentIndex: null,
            translite: function(text) {
                text = text.toLowerCase();
                var
                    rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),
                    eng = "shh sh ch cz yu ya yo zh ` y` e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g);
                for(var x = 0; x < rus.length; x++) {
                    text = text.split(rus[x]).join(eng[x]);
                }
                text = text.replace(' ', '-');
                text = text.replace('`', '');
                return text;
            }
        }
    }])
    // Stocks
    .factory('Stocks', ['HttpResource','$q', function (HttpResource, $q) {
        return {
            stocksList: [],
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
            list: function (callback) {
                var self = this;
                if (self.stocksList.length == 0) {
                    HttpResource.query({params1: 'stocks'}, function (res) {
                        self.stocksList = res;
                        callback(res);
                    }, function (err) {
                        console.error('Get stoks', err);
                    })
                } else {
                    callback(self.stocksList)
                }
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

    // Comments
    .factory('ReviewsAdmin',['HttpResource', function (HttpResource) {
        return {
            list: null,
            getCom: function (callback) {
                var self = this;
                HttpResource.query({params1: 'reviews'}, function (res) {
                    self.list = res;
                    callback(null, self.list);
                }, function (err) {
                    callback(err);
                })
            },
            remove: function (id, callback) {
                HttpResource.delete({params1: 'reviews', params2: id}, function (res) {
                    callback(null, res);
                }, function (err) {
                    callback(err);
                })
            },
            changeStatus: function (review, callback) {
                HttpResource.put({params1: 'reviews', params2: review.uuid}, review, function (res) {
                    callback(null, res);
                }, function (err) {
                    callback(err);
                })
            }
        }
    }])
    .factory('SlideshowService',['HttpResource', function (HttpResource) {
        return {
            list: function (callback) {
                HttpResource.query({params1: 'sliders'}, function (res) {
                    callback(null, res);
                }, function (err) {
                    callback(err);
                })
            },
            save: function (slider, callback) {
                HttpResource.save({params1: 'slider'}, slider, function (res) {
                    callback(null, res);
                }, function (err) {
                    callback(err);
                })
            },
            update: function (slider, callback) {
                HttpResource.put({params1: 'slider', params2: slider.uuid}, slider, function (res) {
                    callback(null, res);
                }, function (err) {
                    callback(err);
                })
            },
            remove: function (slide, callback) {
                console.log(slide);
                HttpResource.delete({params1: 'slider', params2: slide.uuid}, function (res) {
                    callback(null, res);
                }, function (err) {
                    callback(err);
                })
            },
            getImage: function (slide, callback) {
                HttpResource.query({params1: 'files', params2: slide.uuid}, function (res) {
                    if (res.length > 0) {
                        slide.image = res[0].uuid;
                        for (var i = 1; i < res.length; i++) {
                            removeImage(res[i].uuid);
                        }
                    }
                    callback(slide);
                }, function (err) {
                    console.log('err', err);
                })
            }
        };

        function removeImage (id) {
            HttpResource.delete({params1: 'file', params2: id}, function (res) {
                console.log('removed image', res);
            }, function (err) {
                console.log('err', err);
            })
        }
    }])
    .factory('MusicService',['HttpResource', function (HttpResource) {
        return {
            list: function (callback) {
                HttpResource.query({params1: 'files', params2: 'music'}, function (res) {
                    callback(null, res);
                }, function (err) {
                    callback(err);
                })
            },
            // save: function (slider, callback) {
            //     HttpResource.save({params1: 'slider'}, slider, function (res) {
            //         callback(null, res);
            //     }, function (err) {
            //         callback(err);
            //     })
            // },
            // update: function (slider, callback) {
            //     HttpResource.put({params1: 'slider', params2: slider.uuid}, slider, function (res) {
            //         callback(null, res);
            //     }, function (err) {
            //         callback(err);
            //     })
            // },
            remove: function (music, callback) {
                HttpResource.delete({params1: 'file', params2: music.uuid}, function (res) {
                    callback(null, res);
                }, function (err) {
                    callback(err);
                })
            },
            // getImage: function (slide, callback) {
            //     HttpResource.query({params1: 'files', params2: slide.uuid}, function (res) {
            //         if (res.length > 0) {
            //             slide.image = res[0].uuid;
            //             for (var i = 1; i < res.length; i++) {
            //                 removeImage(res[i].uuid);
            //             }
            //         }
            //         callback(slide);
            //     }, function (err) {
            //         console.log('err', err);
            //     })

        }
    }])
    .factory('RequestService',['HttpResource', '$q', function (HttpResource, $q) {
        return {
            list: function (callback) {
                HttpResource.query({params1: 'orders'}, function (res) {
                    callback(null, res);
                }, function (err) {
                    callback(err);
                })
            },
            getOneOrder: function (id, callback) {
                HttpResource.get({params1: 'order', params2: id}, function (res) {
                    getAllProducts(res, callback)
                    // console.log(res);
                }, function (err) {
                    callback(err);
                })
            }
        };

        function getAllProducts(order, callback) {
            var promises = [];
            // console.log(order);
            _.each(order.products, function (product) {
                promises.push($q(function (resolve, reject) {
                    HttpResource.get({params1: 'product', params2: product.productID}, function (res) {
                        // console.log(res);
                        res.count = product.count;
                        var allCombos = angular.copy(res.combo);
                        res.combo = product.combo;
                        // res.price = product.price;
                        product = res;
                        product.allCombos = allCombos;

                        //delete product._id;
                        //delete product.category;
                        //delete product.created;
                        //delete product.description;
                        //delete product.show;
                        //delete product.sublines;

                        HttpResource.query({params1: 'files', params2: res.uuid, type: "main"}, function (image) {
                            product.image = image[0].uuid;
                            product.productID = res.uuid
                            resolve(product);
                        });
                    }, function (err) {
                        reject(err);
                    })
                }))
            });

            $q.all(promises).then(function (res) {
                order.products = res;
                return callback(null, order);
            })
        }
    }]);

