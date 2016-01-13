//Creation of an application not needed to bind it to a global variable
angular.module('App', ['ngRoute','ngDraggable', 'gridster','socketService'])
    .config(['$routeProvider',
		function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: '../html/template/view.html',
                    controller: 'DashboardCtrl'
                });
		}
	])