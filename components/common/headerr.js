angular.module('app')
    .component('headerr', {
        templateUrl: "components/common/headerr.html",
        controller: ['User', 'Cart', 'angularPlayer', '$rootScope', 'HttpResource', function(User, Cart, angularPlayer, $rootScope, HttpResource) {
            var self = this;
            this.User = User;
            this.Cart = Cart;
            this.Cart.list();
            this.Cart.listDef();
            this.logout = function () {
                User.deactive();
            };
            self.songs = []
            this.$onInit = function () {
                HttpResource.query({params1: 'files', params2: 'music'}, function (res) {
                    console.log('music', res);
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
                    // self.showPlayer = true;
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
                console.log('init')
                // angularPlayer.addToPlaylist(
                //     {
                //         id: 'l.uuid',
                //         title: 'el.uuid',
                //         artist: 'el.name',
                //         url: 'http://95.46.99.177/api/file/98e57600-acdc-4e08-bb2e-e8f3ceb80e3f'
                //     }
                // );

                // angularPlayer.addToPlaylist(
                //     {
                //         id: 'l.uuid',
                //         title: 'el.uuid',
                //         artist: 'el.name',
                //         url: 'http://95.46.99.177/api/file/98e57600-acdc-4e08-bb2e-e8f3ceb80e3f'
                //     }
                // );

                // angularPlayer.addTrack({
                //     id: 'l.uuid',
                //     title: 'el.uuid',
                //     artist: 'el.name',
                //     url: 'http://95.46.99.177/api/file/98e57600-acdc-4e08-bb2e-e8f3ceb80e3f'
                // });

                // angularPlayer.addToPlaylist({
                //     id: 'l.uuid',
                //     title: 'el.uuid',
                //     artist: 'el.name',
                //     url: 'http://95.46.99.177/api/file/98e57600-acdc-4e08-bb2e-e8f3ceb80e3f'
                // });
                // angularPlayer.playTrack(1)
                angularPlayer.play()
                // angularPlayer.repeatToggle();
                // self.repeat = angularPlayer.getRepeatStatus();
            });
            // $rootScope.$on('track:progress', function (t, d) {
            //     console.log('d',d)
            //     if(d >= 5) {
            //        angularPlayer.initPlayTrack();
            //         // angularPlayer.addTrack({
            //         //     id: 'l.uuids',
            //         //     title: 'el.uuisd',
            //         //     artist: 'el.namse',
            //         //     url: 'http://95.46.99.177/api/file/2c861042-53eb-4873-979d-0124e82f4e25'
            //         // });
            //         angularPlayer.play();
            //     }
            // })

        }]
    });