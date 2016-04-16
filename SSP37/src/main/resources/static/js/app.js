angular.module('ssp37App', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
        // Change
        $urlRouterProvider.otherwise("/login")
        $stateProvider
            // Add
            .state('login', {
                url: "/login",
                templateUrl: "templates/login.html",
                controller: "LoginCtrl"
            })
            // Add
            .state('logout', {
                url: "/logout",
                controller: "LogoutCtrl"
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
        // Add
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    })
    .factory('hello', function($http) {
        return {
            get: function() {
                return $http.get('/helloOrBad?bad=false');
            }
        };
    })
    // Add
    .factory('auth', function($http, $q) {
        return {
            authenticated: false,
            principal: {},
            login: function(credentials) {
                var self = this
                var headers = credentials
                ? { authorization : "Basic " + btoa(credentials.username + ":" + credentials.password) }
                : {};
                return $http.get('/user', {headers : headers})
                .then(function(response) {
                    self.authenticated = true
                    self.principal = response.data
                    return response;
                })
                .catch(function(response) {
                    self.authenticated = false
                    self.principal = {}
                    return $q.reject(response);
                });
            },
            logout: function() {
                var self = this
                return $http.post("/logout", {})
                .finally(function() {
                    self.authenticated = false
                    self.principal = {}
                });
            }
        };
    })
    // Add
    .controller('NavCtrl', function($scope, auth) {
        $scope.auth = auth
    })
    // Add
    .controller('LoginCtrl', function($scope, $state, auth) {
        $scope.error = false
        $scope.authenticated = auth.authenticated
        $scope.credentials = { username: "", password: "" }
        $scope.login = function(credentials) {
            return auth.login(credentials)
            .finally(function() {
                $scope.error = !auth.authenticated
                $scope.authenticated = auth.authenticated
                if($scope.authenticated) {
                    $state.go("hello")
                }
            });
        }
    })
    // Add
    .controller('LogoutCtrl', function($state, auth) {
        auth.logout()
        .finally(function() {
            $state.go("login")
        });
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
