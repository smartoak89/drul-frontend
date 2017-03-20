angular.module('app')
    .service('FilterService', ['Httpquery', '$cookies',
        function (Httpquery, $cookies) {
            return {
                filters: {},
                getFilter: function (category, callback) {
                    // var self = this;
                    // if (self.filters[category]) return false;
                    Httpquery.query({params1: 'category', params2: category, params3: 'filter'}, function (res) {
                        // self.filters[category] = res;
                        callback(res);
                    }, function (err) {
                        console.error('filter response', err);
                    })
                }
            }
    }]);