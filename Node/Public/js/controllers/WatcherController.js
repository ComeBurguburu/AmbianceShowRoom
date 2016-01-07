angular.module('AppWatcher').controller('watcherController', ['$scope', 'watcherserv', function ($scope, watcherserv) {

	function callback(ret) {

		$scope.error = ret.error;
		$scope.info = ret.info;
		$scope.list = ret.list;
		$scope.src = ret.img;

		$scope.me = ret.me;


		$scope.left = 0;
		$scope.top = 0;
		$scope.width = "100%";
		$scope.height = "100%";

		$scope.$apply();
	}
	watcherserv.init(callback);


	/*$("#identify").click(function () {
			socket.emit("identification", JSON.stringify())
		});*/
	/*
		$("#disconnect").click(function () {
			socket.emit("remove", $("#number").val());
		});*/
		}]);