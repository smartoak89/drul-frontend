angular.module('app')
    .service('Httpquery', ['$resource', 'Conf', function ($resource, Conf) {
        return $resource(Conf.api_path+'/:params1/:params2/:params3', {order: '@order'}, {
            put: {
                method: "PUT"
            }
        });
    }]);