angular.module('app')
    .service('Httpquery', ['$resource', function ($resource) {
        return $resource('/api/:params1/:params2/:params3', {order: '@order'}, {
            put: {
                method: "PUT"
            }
        });
    }]);