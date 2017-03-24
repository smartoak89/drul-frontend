angular.module('app')
    .factory('RequestIntercepror', ['$q', 'Conf', 'User', '$templateCache', '$location',
        function ($q, Conf, User, $templateCache, $location) {

        var defer = $q.defer();

        return {
                // optional method
                request: function(req) {
                    var toApiUrl = (req.url.search(Conf.api_path) !== -1);
                    var token = User.token();

                    if (toApiUrl && token) {
                        req.headers['authorization'] = token;
                    }

                    return req;
                }
                // response: function (res) {
                //     defer.resolve(res);
                //     console.log('response', res);
                //     return res;
                // },
                // responseError: function(error) {
                //     console.log('error', error);
                //     var responseFromAPI = (error.config.url.search(Conf.api_path) !== -1);
                //
                //     if (responseFromAPI) {
                //
                //         if (error.status == 401) {
                //             $templateCache.removeAll();
                //             User.deactivate();
                //             $location.url('/index');
                //         }
                //     }
                //     defer.reject(error);
                //     return defer;
                // }
            };
    }]);