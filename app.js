var app = angular.module('app', [require('angular-route'), 'angularUtils.directives.dirPagination', 'ngContextMenu']).
	value('urlBase', 'http://172.30.1.117:8080/');

app.config(function ($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "views/script/script.html",
		controller: "scriptController",
		access: { requiredLogin: false }
	});
});

app.directive('ngRightClick', function ($parse) {
	return function (scope, element, attrs) {
		var fn = $parse(attrs.ngRightClick);
		element.bind('contextmenu', function (event) {
			scope.$apply(function () {
				event.preventDefault();
				fn(scope, { $event: event });
			});
		});
	};
});