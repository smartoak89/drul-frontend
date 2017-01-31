angular.module('app')
    .factory('SliderService', ['HttpResource', function (HttpResource) {
        return {
            list: function (callback) {
                HttpResource.query({params1: 'sliders'}, function (res) {
                    callback(null, res);
                }, function (err) {
                    callback(err);
                })
            },
            getImage: function (slide, callback) {
                HttpResource.query({params1: 'files', params2: slide.uuid}, function (res) {
                    if (res.length > 0) {
                        slide.image = res[0].uuid;
                    }
                    callback(slide);
                }, function (err) {
                    console.log('err', err);
                })
            }
        }
    }]);