angular.module('app')
    .service('FilterService', ['Httpquery',function (Httpquery) {
        return {
            getFilter: function (category) {
                Httpquery.get({params1: 'filter', params2: category}, function (res) {
                    console.log(res);
                }, function (err) {
                    console.error(err);
                })
            }
        }
    }]);