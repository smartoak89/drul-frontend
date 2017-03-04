angular.module('app')
    .service('FileService', ['Httpquery', 'User', function (Httpquery, User) {
        this.listGallery = function (product) {
            Httpquery.query({params1: 'files', params2: product.uuid}, function (res) {
                product.photo = _.find(res, {type: 'main'});
                product.gallery = res;
            });
        };

        this.mainPhoto = function (product) {
            Httpquery.query({params1: 'files', params2: product.uuid, type: 'main'}, function (res) {
                product.photo = res[0]
            });
        }


    }]);
