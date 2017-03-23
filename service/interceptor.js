angular.module('app')
    .factory('RequestIntercepror', ['Conf', 'User', '$templateCache', '$location',
        function (Conf, User, $templateCache, $location) {
            return {
                // optional method
                request: function(req) {

                    var toApiUrl = (req.url.search(Conf.api_path) !== -1);
                    var token = User.token();

                    if (toApiUrl && token) {
                        req.headers['authorization'] = token;
                    }

                    return req;
                },
                responseError: function(error) {
                    console.log('error', error);
                    var responseFromAPI = (error.config.url.search(Conf.api_path) !== -1);

                    if (responseFromAPI) {

                        if (error.status == 401) {
                            $templateCache.removeAll();
                            User.deactivate();
                            $location.url('/index');
                        }
                    }

                    return error;
                }
            };
    }]);