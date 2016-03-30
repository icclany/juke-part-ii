'use strict';

juke.factory('PlayerFactory', function($rootScope){
  // non-UI logic in here
  var tools = {};
  var currentSong = null; // What's the current song?
  var isPlayingStatus = false; // Is it playing?
  var playlist;

    // initialize audio player (note this kind of DOM stuff is odd for Angular)
  var audio = document.createElement('audio');

  // Load and play a song/collection
  tools.start = function(song, songList) {
  	// stop existing audio (e.g. other song) in any case
    this.pause();
    isPlayingStatus = true;
    // resume current song
    if (song === this.getCurrentSong()) return audio.play();
    // enable loading new song
    currentSong = song;
    playlist = songList;
    audio.src = song.audioUrl;
    audio.load();
    audio.play();
  }

  // Pauses any currently playing song
  tools.pause = function() {
  	audio.pause();
    isPlayingStatus = false; 
  };

  // Continues the current song after pause
  tools.resume = function() {
  	this.start(currentSong);
  };

  // Boolean if playing
  tools.isPlaying = function() {
  	return isPlayingStatus;
  }

  // Returns the current song
  tools.getCurrentSong = function() {
  	return currentSong;
  };

  // Move to the next song in a list
  tools.next = function() {
	 // this.pause(); 
   var m = playlist.length;
   for (var i = 0; i < playlist.length; i++){
    if (playlist[i].audioUrl === currentSong.audioUrl) {
      return tools.start(playlist[(((i + 1) % m) + m) % m], playlist);
    }
   }
  };

  // Move to the previous song in a list
  tools.previous = function() {
    var m = playlist.length;
    for (var i = 0; i < playlist.length; i++){
    if (playlist[i].audioUrl === currentSong.audioUrl) {
      return tools.start(playlist[(((i - 1) % m) + m) % m], playlist);
    }
   }
  };

  // Returns a value from 0 to 1
  tools.getProgress = function() {
  	return ((audio.currentTime / audio.duration) || 0);
  };

  return tools;

});
