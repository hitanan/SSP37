angular.module('ssp37App', [])
	.controller('HelloCtrl', function($http, $scope) {
		$http.get('/hello')
		.then(function(response) {
			 $scope.hello = response.data;
		 })
	})
	;
