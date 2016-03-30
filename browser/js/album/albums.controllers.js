'use strict';

juke.controller('AlbumsCtrl', function($scope, $rootScope, StatsFactory) {

  StatsFactory.fetchAll()
    .then(function(albums) {
      $rootScope.albums = albums;
      $scope.showAll = true;
    })

  // Get all the albums from the back end with factory $http function
  $scope.$on("viewAll", function(event, data) {
    $scope.showAll = true;
  })

   $scope.$on("viewAllArtists", function(event, data) {
    $scope.showAll = false;
  })

  $scope.view = StatsFactory.flip;

  // Broadcast album pick event 
  $scope.selected = function(album) {
    $scope.showAll = false;
    $rootScope.$broadcast('albumPick', album);
    // StatsFactory.flip();
  }
});
