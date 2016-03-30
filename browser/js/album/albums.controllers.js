'use strict';

juke.controller('AlbumsCtrl', function($scope, $rootScope, StatsFactory) {

	StatsFactory.fetchAll()
	.then(function(albums){
		$rootScope.albums = albums;
		console.log(albums);
	})

	$scope.selected = function(album) {
		$rootScope.$broadcast('albumPick', album);
	}
});