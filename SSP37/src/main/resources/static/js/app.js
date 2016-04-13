angular.module('ssp37App', [])
	.controller('HelloCtrl', function($http, $scope) {
		// Change
		$http.get('/helloOrBad?bad=true')
		.then(function(response) {
			 $scope.hello = response.data;
		 })
		 // Add
		 .catch(function(response) {
			 $scope.status = response.status;
			 $scope.statusText = response.statusText;
		 })
	})
	;
