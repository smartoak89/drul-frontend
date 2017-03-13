angular.module('app')
    .factory('RequestIntercepror', function (Conf, User) {
        return {
            // optional method
            'request': function(req) {

                var toApiUrl = (req.url.search(Conf.api_path) !== -1);
                var token = User.token();

                if (toApiUrl && token) {
                    req.headers['authorization'] = token;
                }

                return req;
            }
        };
    });