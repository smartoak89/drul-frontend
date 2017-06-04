angular.module('app')
    .component('reviews', {
        templateUrl: "components/common/reviews/reviews.html",
        bindings: {
            product: '='
        },
        controller: ['$rootScope', 'User', 'ReviewsService', 'Product', function($rootScope, User, ReviewsService, Product) {

            var self = this;
            this.commBody = { body: null };
            var product = this.product;
            this.commentsExists = _.find(product.comments, {publish: true});
            this.$onInit = function () {

                this.activeUser = User.get();
                console.log(this.activeUser);
                self.isAdmin = User.isAdmin();

                if (self.activeUser) accessFormReviews();
            };

            this.sendComm = function(){
                if(!self.commBody.owner_name) return self.error = 'Введите имя автора!';
                if(!self.commBody.body || self.commBody.body.length < 4) return self.error = 'Текст отзыва должен быть не мение чем 4 символа!';
                self.error = null;

                ReviewsService.addReviews(product.uuid, self.commBody, function (err, res) {
                    if (err) return self.error = err.data.message;
                    self.commBody.body = '';
                    self.commBody.owner_name = '';
                    if (self.isAdmin) product.comments.push(res);
                    self.message = 'Отзыв будет опубликован после проверки администратором!';
                })
            };

            function accessFormReviews() {
                ReviewsService.accessFormReviews(product.uuid, function (access) {
                    self.accessFormReview = access;
                })
            }

            $rootScope.$on('reviewRemoved', function (event, reviewId) {
                _.remove(product.comments, {uuid: reviewId});
            });

            // $rootScope.$on('reviewPublished', function (event, reviewId) {
            //     _.find(product.comments, {uuid: reviewId}).publish = true;
            // });


        }]
    });