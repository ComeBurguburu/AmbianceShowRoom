angular.module('AppWatcher').controller('watcherController', ['$scope', 'watcherserv', function ($scope, watcherserv) {

	function callback(ret) {

		$scope.error = ret.error;
		$scope.info = ret.info;
		$scope.list = ret.list;
		$scope.src = ret.img;

		$scope.me = ret.me;


		$scope.left = 0;
		//$scope.left = undefined;
		$scope.top = 0;
		$scope.width = "1600px";
		$scope.height = "auto";

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