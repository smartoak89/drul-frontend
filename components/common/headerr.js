angular.module('app')
    .component('headerr', {
        templateUrl: "components/common/headerr.html",
        controller: ['User', 'Cart', 'angularPlayer', '$rootScope', 'HttpResource', function(User, Cart, angularPlayer, $rootScope, HttpResource) {
            var self = this;

            this.user = User.get();
            this.Cart = Cart;
            this.Cart.list();
            this.Cart.listDef();
            this.logout = function () {
                User.deactivate();
                self.user = null;
            };

            $rootScope.$on('userActivate', function () {
                self.user = User.get();
            });


            self.songs = [];
            this.$onInit = function () {
<<<<<<< HEAD

                 HttpResource.query({params1: 'files', params2: 'music'}, function (res) {
                     self.songs = res;
                     self.showPlayer = true;
                 })

=======
                HttpResource.query({params1: 'files', params2: 'music'}, function (res) {
                    // self.songs = res.map(function (el){
                    //         return {
                    //             id: el.uuid,
                    //             title: el.uuid,
                    //             artist: el.name,
                    //             url: 'http://95.46.99.177/api/file/' + el.uuid
                    //         }
                    // })
                    // res.forEach(function (el) {
                    //
                    //     self.songs.push({
                    //         id: el.uuid,
                    //         title: el.type,
                    //         artist: el.name,
                    //         url: 'http://95.46.99.177/api/file/' + el.uuid
                    //     })
                    // });
                     self.showPlayer = true;
                })
>>>>>>> 44dcb387f6e632abb9511aea0f39e868f0b8e7ad
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
                    angularPlayer.play()
                })

            });

        }]
    });