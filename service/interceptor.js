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
                console.log(toApiUrl, token);
                return req;
            },

            // optional method
            'requestError': function(rejection) {
                // do something on error

                return rejection;
            },



            // optional method
            'response': function(response) {
                // do something on success
                return response;
            },

            // optional method
            'responseError': function(rejection) {
                // do something on error
               return rejection;
            }
        };
    });