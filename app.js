var app = angular.module('app', [require('angular-route'),'angularUtils.directives.dirPagination']).
value('urlBase', 'http://172.30.1.155:8080/');

app.config(function($routeProvider){
	$routeProvider.when("/", {
		templateUrl : "views/script/script.html",
		controller : "scriptController",
        access: { requiredLogin: false }
	});
});