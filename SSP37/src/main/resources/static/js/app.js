angular.module('ssp37App', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/hello")
        $stateProvider
            .state('hello', {
                url: "/hello",
                templateUrl: "templates/hello.html",
                controller: "HelloCtrl",
                // Add
                resolve: {
                    helloRsl: function(hello) {
                        return hello.get();
                    } 
                }
            })
            .state('blue', {
                url: "/blue",
                templateUrl: "templates/blue.html",
                controller: "BlueCtrl"
            })
            .state('green', {
                url: "/green",
                templateUrl: "templates/green.html",
                controller: "GreenCtrl"
            })
            ;
    })
    .factory('hello', function($http) {
        return {
            get: function() {
                return $http.get('/helloOrBad?bad=false');
            }
        };
    })
    // Change
    .controller('HelloCtrl', function($scope, helloRsl) {
        $scope.hello = helloRsl.data
    })
    .controller('BlueCtrl', function($scope) {
        $scope.color = "blue"
    })
    .controller('GreenCtrl', function($scope) {
        $scope.color = "green"
    })
    ;
