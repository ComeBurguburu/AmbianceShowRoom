angular.module('AppWatcher').controller('watcherController', ['$scope', 'watcherserv', function ($scope, watcherserv) {

	function callback(ret) {

		$scope.error = ret.error;
		$scope.info = ret.info;
		$scope.list = ret.list;


		$scope.me = ret.me;

		if (ret.img === undefined) {
			$scope.$apply();
			return;
		}

		$scope.src = ret.img.url;
		//$scope.left = 0;
		console.log(ret.img);

		$scope.left = ret.img.left + (isNaN(ret.img.left) ? "" : "px");


		$scope.top = ret.img.top + (isNaN(ret.img.top) ? "" : "px");
		console.info(ret.img.width);
		$scope.width = "" + ret.img.width + (isNaN(ret.img.width) ? "" : "px");
		console.info($scope.width);
		$scope.height = "auto";
		console.log(ret.img);
		console.log($scope);

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