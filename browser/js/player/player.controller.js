'use strict';

juke.controller('PlayerCtrl', function($scope, $rootScope, PlayerFactory, $interval) {

  // state
  $scope.currentSong = PlayerFactory.getCurrentSong;
  $scope.playing = PlayerFactory.isPlaying;

  // main toggle
  $scope.toggle = function(song) {
    if (PlayerFactory.isPlaying()) PlayerFactory.pause();
    else PlayerFactory.start(song);
  };

  // outgoing events (to Album… or potentially other characters)
  $scope.next = PlayerFactory.next;

  $scope.prev = PlayerFactory.previous;

  // Progress bar?
  $interval(function() {
    $scope.progress = function() {
      return 100 * PlayerFactory.getProgress();
    }
  });


});
