angular.module('app')
    .component('headerr', {
        templateUrl: "components/common/headerr.html",
        controller: ['User', 'Cart', function(User, Cart) {
            var self = this;
            this.User = User;
            this.Cart = Cart;
            this.logout = function () {
                // this.user = null;
                User.deactive();
            };
            this.click = function () {
                User.set({id: 92873928219});
            };
            self.volume = 's-21';
            self.volumeSlider = {
                value: 100,
                options: {
                    showSelectionBar: true,
                    onChange: function () {
                        if (self.volumeSlider.value > 0) {
                            self.volume = 's-21'
                        } else {
                            self.volume = 's-22';
                        }
                    }
                }
            };

            self.songs = [];

            SC.initialize({
                client_id: "202120949",
                redirect_uri: 'http://95.46.99.177/'
            });
            SC.get('/me', function(me) {
                console.log(me);
            });
            //SC.get("/me", {
            //    limit: 5
            //}, function(tracks) {
            //    console.log(tracks);
                //for (var i = 0; i < tracks.length; i ++) {
                //    SC.stream( '/tracks/' + tracks[i].id, function( sm_object ){
                //        var track = {
                //            id: tracks[i].id,
                //            title: tracks[i].title,
                //            artist: tracks[i].genre,
                //            url: sm_object.url
                //        };
                //
                //        $scope.$apply(function () {
                //            $scope.songs.push(track);
                //        });
                //    });
                //}
            //});
        }]
    });