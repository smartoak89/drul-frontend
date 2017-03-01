angular.module('app')
    .component('headerr', {
        templateUrl: "components/common/headerr.html",
        controller: ['User', 'Cart', 'angularPlayer', '$rootScope', 'HttpResource', '$location', function(User, Cart, angularPlayer, $rootScope, HttpResource, $location) {
            var self = this;
            this.User = User;
            this.user = User.get();
            this.Cart = Cart;
            this.Cart.list();
            this.Cart.listDef();
            self.search = false;
            this.logout = function () {
                User.deactivate();
                self.user = null;
                self.Cart.cartList = null;
                self.Cart.defList = null;
                $location.path('/');
            };

            $rootScope.$on('userActivate', function () {
                self.user = User.get();
                self.Cart.list();
                self.Cart.listDef();
            });


            self.songs = [];
            this.$onInit = function () {

                 HttpResource.query({params1: 'files', params2: 'music'}, function (res) {
                     self.songs = res;
                     self.showPlayer = true;
                 })

            };
            self.volume = 's-21';
            self.volumeSlider = {
                value: 100,
                options: {
                    showSelectionBar: true,
                    onChange: function () {
                        angularPlayer.adjustVolumeSlider(self.volumeSlider.value);
                        if (self.volumeSlider.value > 0) {
                            self.volume = 's-21'
                        } else {
                            self.volume = 's-22';
                        }
                    }
                }
            };
            self.mute = function(){
                if (self.volumeSlider.value > 0) {
                    self.curVol = self.volumeSlider.value;
                    console.log(self.curVol);
                    self.volumeSlider.value = 0;
                    self.volume = 's-22';
                    angularPlayer.adjustVolumeSlider(self.volumeSlider.value);
                }else{
                    self.volumeSlider.value = self.curVol;
                    self.volume = 's-21';
                    angularPlayer.adjustVolumeSlider(self.volumeSlider.value);
                    self.curVol = null;
                }
            };

            $rootScope.$on('angularPlayer:ready', function(event, data) {

                angularPlayer.clearPlaylist(function(data) {
                    for (var i = 0; i < self.songs.length; i++) {
                        var newSong = {
                            id: '' + i,
                            title: self.songs[i].name,
                            artist: self.songs[i].type,
                            url: 'http://95.46.99.177/api/file/' + self.songs[i].uuid
                        }
                        self.songs[i].id = '' + i;
                        angularPlayer.addTrack(newSong);
                    }
                    angularPlayer.play();
                });

            });

        }]
    });