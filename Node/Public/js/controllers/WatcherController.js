angular.module('AppWatcher').controller('watcherController', ['$scope', 'watcherserv', function ($scope, watcherserv) {

	function callback(ret) {
		
		$scope.error = ret.error;
		$scope.info = ret.info;
		$scope.list = ret.list;
		$scope.src=ret.img;
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