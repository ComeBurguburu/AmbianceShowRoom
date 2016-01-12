//Creation of an application not needed to bind it to a global variable
angular.module('App', ['ngDraggable', 'socketService', 'imageManagerFactory', 'gridster', 'ui.bootstrap', 'ngRoute','nvd3ChartDirectives',"leaflet-directive"])
	.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider
				.when('/dashboard', {
					templateUrl: '../html/template/view.html',
					controller: 'DashboardCtrl'
				})
				.otherwise({
					redirectTo: '/dashboard'
				});
		}
	])