var app = angular.module("userDetails",['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
            .when("/details", {
                templateUrl: "views/details.html",
                controller: "UserController"
            })
            .when("/", {
                templateUrl: "views/plist.html",
                controller: "UserController"
            })
            .otherwise({
                redirectTo: "/",
            })
});

var users = [];
app.controller("UserController", function ($http, $routeParams) {
    var self = this;
    if (users.length === 0) {
        $http.get("data/data.json").success(function (data) {
            users = data.users;
            self.users = users;
        })
    } else { //We used the cache property on the http request instead
        self.users = users;
    }
    if (users != null) {
        console.log("Adding user: " + $routeParams.id)
        self.user = users[$routeParams.id];
    }
    
    self.detailedUser = {};
    
    this.setUser = function(user){
        self.detailedUser = user;
    };
});
