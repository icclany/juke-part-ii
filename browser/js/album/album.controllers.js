'use strict';

juke.controller('AlbumCtrl', function($scope, $rootScope, $log, StatsFactory, PlayerFactory) {

  // Get specific album data from the back end with factory $http function
  StatsFactory.fetchById("56f97744c5a5ed991dfa1cc1") // used to be album._id
    .then(function(album) {
      album.imageUrl = '/api/albums/' + album._id + '.image';
      album.songs.forEach(function(song, i) {
        song.audioUrl = '/api/songs/' + song._id + '.audio';
        song.albumIndex = i;
      });
      $scope.album = album;
      // Set duration of album
      StatsFactory.totalTime(album)
        .then(function(albumDuration) {
          $scope.fullDuration = Math.round(albumDuration);
        });
    })

  // main toggle
  $scope.toggle = function(song) {
    if ($scope.playing() && song === $scope.currentSong()) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.start(song, $scope.album.songs);
      }
  };

  $scope.currentSong = PlayerFactory.getCurrentSong;
  $scope.playing = PlayerFactory.isPlaying;

  // a "true" modulo that wraps negative to the top of the range
  function mod(num, m) {
    return ((num % m) + m) % m;
  };

  // jump `interval` spots in album (negative to go back, default +1)
  function skip(interval) {
    if (!$scope.currentSong) return;
    var index = $scope.currentSong.albumIndex;
    index = mod((index + (interval || 1)), $scope.album.songs.length);
    $scope.currentSong = $scope.album.songs[index];
    if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  };

  function next() { skip(1); };

  function prev() { skip(-1); };

});
