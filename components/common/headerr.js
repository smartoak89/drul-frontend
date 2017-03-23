angular.module('app')
    .component('headerr', {
        templateUrl: "components/common/headerr.html",
        controller: ['$rootScope', 'User', 'Cart', 'DeferredService', 'angularPlayer', 'HttpResource', '$location', 'MainService', '$state', 'Conf',
            function($rootScope, User, Cart, DeferredService, angularPlayer, HttpResource, $location, MainService, $state, Conf) {
                var self = this;
                self.Conf = Conf;
                this.mainService = MainService;
                self.search = false;

                this.logout = function () {
                    User.deactivate();
                    $state.go('index', {reload:true});
                };

                // $rootScope.$on('userActivate', function () {
                //     self.user = User.get();
                // });
                //
                // $rootScope.$on('userDeactivate', function () {
                //     self.user = null;
                //     $state.go('index', {reload: true});
                // });

                $rootScope.$on('changeCart', function (event, cartList) {
                    self.cartList = Cart.getList().length;
                });

                $rootScope.$on('changeDeferred', function (event, cartList) {
                    console.log('changeDeferred')
                    self.deferredList = DeferredService.getList().length;
                });

                self.songs = [];
                this.$onInit = function () {

                     HttpResource.query({params1: 'files', params2: 'music'}, function (res) {
                         self.songs = _.shuffle(res);
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

                    angularPlayer.clearPlaylist(function() {
                        for (var i = 0; i < self.songs.length; i++) {
                            var newSong = {
                                id: '' + i,
                                title: self.songs[i].name,
                                artist: self.songs[i].type,
                                url: self.Conf.api_path + '/file/' + self.songs[i].uuid
                            }
                            self.songs[i].id = '' + i;
                            angularPlayer.addTrack(newSong);
                        }
                        angularPlayer.play();
                    });

                });

            }]
    });