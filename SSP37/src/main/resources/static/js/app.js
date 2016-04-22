// Change
angular.module('ssp37App', ['ui.router' ,'ngResource' ,'spring-data-rest'])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/hello")
        $stateProvider
            // Add
            .state('words', {
                url: "/words",
                templateUrl: "templates/words.html",
                controller: "WordsCtrl",
                resolve: {
                    processedWords: function($http, SpringDataRestAdapter) {
                        return SpringDataRestAdapter.process($http.get("/api/words"));
                    },
                }
            })
            .state('hello', {
                url: "/hello",
                templateUrl: "templates/hello.html",
                controller: "HelloCtrl",
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
    // Add
    .controller('WordsCtrl', function($scope, $http, SpringDataRestAdapter, processedWords) {
        var refreshScope = function(processedWords) {
            $scope.processedWords = processedWords
            $scope.editItem = { spelling: "", favorite: false }
            $scope.newItem = { spelling: "", favorite: false }
        }
        refreshScope(processedWords)
        $scope.selectItem = function(word) {
            angular.extend($scope.editItem, word)
        }
        $scope.update = function(item) {
            item._resources("self", null, {'update': { method: 'PUT' }})
            .update(item)
            .$promise
            .then(function() {
                return SpringDataRestAdapter.process($http.get($scope.processedWords._links.self.href));
            })
            .then(function(processedWords) {
                refreshScope(processedWords)
            })
            ;
        }
        $scope.delete = function(item) {
            item._resources("self")
            .delete()
            .$promise
            .then(function() {
                return SpringDataRestAdapter.process($http.get($scope.processedWords._links.self.href));
            })
            .then(function(processedWords) {
                refreshScope(processedWords)
            })
            ;
        }
        $scope.save = function(item) {
            var wordClass = $scope.processedWords._resources("self")
            wordClass.save(new wordClass(item))
            .$promise
            .then(function() {
                return SpringDataRestAdapter.process($http.get($scope.processedWords._links.self.href));
            })
            .then(function(processedWords) {
                refreshScope(processedWords)
            })
            ;
        }
    })
    .factory('hello', function($http) {
        return {
            get: function() {
                return $http.get('/helloOrBad?bad=false');
            }
        };
    })
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
