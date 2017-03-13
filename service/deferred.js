angular.module('app')
    .service('DeferredService', ['$rootScope', 'Httpquery', 'User', '$timeout', function ($rootScope, Httpquery, User, $timeout) {
        var self = this;
        var defferedList;

        this.list = function (callback) {
            var user = User.get();

            if (user) {

                Httpquery.query({params1: 'deferred'}, function (res) {
                    defferedList = res;
                    callback(defferedList);
                    $timeout(function () { $rootScope.$broadcast('changeDeferred'); }, 50);
                }, function (err) {
                    console.error('can\'t query deferred', err);
                });

                return;
            }

            if (user) return callback(defferedList)
        };

        this.add = function (product, callback) {
            var user = User.get();

            if (user) {
                Httpquery.put({params1: 'deferred', params2: product.uuid}, {}, function (res) {
                    defferedList.push(res);
                    product.def = true;
                    console.log('res', res);
                    $rootScope.$broadcast('changeDeferred');

                    callback();
                }, function (err) {
                    console.error('can\'t add to deferred', err);
                    callback(err);
                })
            }
        };

        this.wasDeferred = function (product) {
            var id = product.uuid;

            var find = _.find(defferedList, {uuid: id});

            if (find) {
                product.def = true;
            } else {
                product.def = false;
            }

            return false;
        }

        this.getList = function () {
            return defferedList;
        }

        this.remove = function (product, callback) {
            var user = User.get();

            if (user) {
                var qwe = {
                    params1:'deferred',
                    params2: product.uuid
                };

                Httpquery.delete(qwe, function(){
                    self.removeFromDeferredList(product);
                    product.def = false;
                    callback();
                }, function(err){
                    callback(err);
                });
            }
        };

        this.removeFromDeferredList = function (product) {
            console.log(_.remove(defferedList, {product: product.uuid}))
            _.remove(defferedList, {product: product.uuid});
            _.remove(defferedList, {uuid: product.uuid});
            $rootScope.$broadcast('changeDeferred');
        };

        this.out = function () {
            defferedList = null;
        }
    }]);