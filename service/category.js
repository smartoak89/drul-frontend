angular.module('app')
    .service('Category', ['Httpquery', '$q', function (Httpquery, $q) {
        var category = null;

        this.getList = function () {
            var deffer = $q.defer();
            if (category == null) {
                Httpquery.query({params1: 'categories'}, function (res) {
                    deffer.resolve(res);
                    category = res;
                }, function (err) {
                    console.log(err);
                    deffer.reject(err);
                })
            }
            return deffer.promise;
        }
    }]);