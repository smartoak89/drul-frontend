angular.module('app')
    .component('headerr', {
        templateUrl: "components/common/headerr.html",
        controller: ['User', 'Cart', 'angularPlayer', '$rootScope', function(User, Cart, angularPlayer, $rootScope) {
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

            self.song =
                {
                    id: 'one',
                    title: 'Rain',
                    artist: 'Drake',
                    url: 'http://freshly-ground.com/data/audio/sm2/Figub%20Brazlevi%C4%8D%20-%20Bosnian%20Syndicate.mp3'
                };

            $rootScope.$on('angularPlayer:ready', function(event, data) {
                angularPlayer.addTrack(self.song);
                //angularPlayer.play();
                angularPlayer.repeatToggle();
                self.repeat = angularPlayer.getRepeatStatus();
                console.log(self.repeat);
            });

        }]
    });