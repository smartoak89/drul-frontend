angular.module('app')
    .service('FilterService', ['Httpquery',function (Httpquery) {
        return {
            filters: {},
            getFilter: function (category) {
                var self = this;
                if (self.filters[category]) return false;
                Httpquery.query({params1: 'filter', params2: category}, function (res) {
                    self.filters[category] = res;
                }, function (err) {
                    console.error('filter response', err);
                })
            }
        }
    }]);