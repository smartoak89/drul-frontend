angular.module('app')
    .factory('Category', ['Httpquery', '$q', function (Httpquery, $q) {
        return {
            category: null,
            getCategories: function (callback) {
                var self = this;
                if (this.category) return callback(null, this.category);

                Httpquery.query({params1: 'categories'}, function (res) {
                    self.category = res;
                    callback(null, self.category);
                }, function (err) {
                    callback(err);
                });


            }
        }
    }]);