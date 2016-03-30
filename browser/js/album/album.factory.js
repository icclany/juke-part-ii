'use strict';

juke.factory('StatsFactory', function ($q, $http, $log) {
  var statsObj = {};

  statsObj.totalTime = function (album) {
    var audio = document.createElement('audio');
    return $q(function (resolve, reject) {
      var sum = 0;
      var n = 0;
      function resolveOrRecur () {
        if (n >= album.songs.length) resolve(sum);
        else audio.src = album.songs[n++].audioUrl;
      }
      audio.addEventListener('loadedmetadata', function () {
        sum += audio.duration/60; // convert to minutes
        resolveOrRecur();
      });
      resolveOrRecur();
    });
  };

  statsObj.fetchAll = function() {
        // load our initial data
      return $http.get('/api/albums/').then(function(albums) {
        return albums.data;
      })
      .catch($log.error); // $log service can be turned on and off; also, pre-bound
    };

    statsObj.fetchById = function(albumid) {
      return $http.get('/api/albums/' + albumid).then(function(album) {
        return album.data;
      })
      .catch($log.error); // $log service can be turned on and off; also, pre-bound
    }

  return statsObj;
});