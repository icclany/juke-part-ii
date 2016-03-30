'use strict';

juke.controller('AlbumCtrl', function($scope, $rootScope, $log, StatsFactory) {

  StatsFactory.fetchById(album._id)
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

    $scope.$on('albumPick', function(event, albumPick) {
      album = albumPick;
    })

  // main toggle
  $scope.toggle = function(song) {
    if ($scope.playing && song === $scope.currentSong) {
      $rootScope.$broadcast('pause');
    } else $rootScope.$broadcast('play', song);
  };

  // incoming events (from Player, toggle, or skip)
  $scope.$on('pause', pause);
  $scope.$on('play', play);
  $scope.$on('next', next);
  $scope.$on('prev', prev);

  // functionality
  function pause() {
    $scope.playing = false;
  }

  function play(event, song) {
    $scope.playing = true;
    $scope.currentSong = song;
  };

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
