'use strict';

juke.controller('AlbumsCtrl', function($scope, $rootScope, StatsFactory) {

	// Get all the albums from the back end with factory $http function
	StatsFactory.fetchAll()
	.then(function(albums){
		$rootScope.albums = albums;
	})

	// Broadcast album pick event 
	$scope.selected = function(album) {
		$rootScope.$broadcast('albumPick', album);
	}
});