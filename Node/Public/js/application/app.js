//Creation of an application not needed to bind it to a global variable
angular.module('App', ['ngRoute', 'ngDraggable', 'gridster', 'socketService', 'configService'])

    .config(['$routeProvider',
		function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'view.html',
                    controller: 'DashboardCtrl'
                }).otherwise({
                    redirectTo: '/'
                });
		}
	])