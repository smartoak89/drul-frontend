angular.module('app')
    .service('FilterService', ['Httpquery',function (Httpquery) {
        return {
            getFilter: function (category) {
                Httpquery.get({params1: 'filter', })
            }
        }
    }]);