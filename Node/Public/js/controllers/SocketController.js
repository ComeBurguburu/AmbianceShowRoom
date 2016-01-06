angular.module('App').controller('socketController', ['$scope', 'sockserv', function ($scope, sockserv) {

	$scope.test = function () {

		function callback(ret) {
			$scope.error = ret.error;
			$scope.info = ret.info;
			$scope.list = ret.list;

			/*
			//$scope.list = ["a", "b", "c"];
			//$scope.$apply();
			//	console.log(ret);
			var a = JSON.stringify(ret);
			console.log(a);
			console.log(ret.list[0]);
			console.log($scope.list);
			console.log(ret.list);
			alert(ret.list);
			console.log(ret.list.length);*/
		}
		sockserv.init(callback);
	}

	/*$("#identify").click(function () {
			socket.emit("identification", JSON.stringify())
		});*/
	/*
		$("#disconnect").click(function () {
			socket.emit("remove", $("#number").val());
		});*/
	}]);