angular.module('App').controller('socketController', socketCrtFnt);

socketCrtFnt.$inject=['$scope','$log','sockserv','imanagefact'];

function socketCrtFnt($scope, $log, sockserv, imanagefact){

	$scope.test = function () {
		

		function callback(ret) {
			$scope.error = ret.error;
			$scope.info = ret.info;
			$scope.list = ret.list;
			if(!isNaN(ret.me)){
			$scope.me=ret.me;
			}
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
			$scope.$apply();
			$scope.addWatcher($scope.info);
			console.log("$scope.info" + ret.info);
			console.log("$scope.list" + ret.list);
		}
		sockserv.init(callback);
	}

	$scope.screenList = [];

	$scope.imgSrcList = [];

	$scope.NbParallelScreen = 2;
	$scope.NbPerpendicularScreen = 4;

	$scope.fillScreenList = function(){
		$scope.screenList[0] = {width: 400, height: 400, X:0, Y:0};
		$scope.screenList[1] = {width: 400, height: 400, X:20, Y:0};
		$scope.screenList[2] = {width: 385, height: 400, X:50, Y:50};
		$scope.screenList[3] = {width: 420, height: 400, X:10, Y:60};
		$scope.screenList[4] = {width: 410, height: 400, X:0, Y:20};
		$scope.screenList[5] = {width: 380, height: 400, X:40, Y:60};
		$scope.screenList[6] = {width: 400, height: 400, X:0, Y:20};
		$scope.screenList[7] = {width: 400, height: 400, X:0, Y:0};
	}
	$scope.fillScreenList();

	$scope.fillImgSrcList = function(){
		$scope.imgSrcList[0] = {src: "../images/0.jpg"};
		$scope.imgSrcList[1] = {src: "../images/1.jpg"};
		$scope.imgSrcList[2] = {src: "../images/2.jpg"};
		$scope.imgSrcList[3] = {src: "../images/3.jpg"};
		$scope.imgSrcList[4] = {src: "../images/4.jpg"};
		$scope.imgSrcList[5] = {src: "../images/5.jpg"};
		$scope.imgSrcList[6] = {src: "../images/6.jpg"};
		$scope.imgSrcList[7] = {src: "../images/7.jpg"};
		$scope.imgSrcList[8] = {src: "../images/8.jpg"};
		$scope.imgSrcList[9] = {src: "../images/9.jpg"};
		$scope.imgSrcList[10] = {src: "../images/10.jpg"};
		$scope.imgSrcList[11] = {src: "../images/11.jpg"};
		$scope.imgSrcList[12] = {src: "../images/12.jpg"};
		$scope.imgSrcList[13] = {src: "../images/13.jpg"};
	}
	$scope.fillImgSrcList();

	$scope.addWatcher = function(information) {

		var arraySize = $scope.screenList.length;
		console.log("arraySize = " + arraySize);

		$scope.screenList[arraySize] = {
											width: information.width,
											height: information.height,
											X: information.X,
											Y: information.Y
										};
		console.log("new watcher : " + $scope.screenList[arraySize]);
	}

	$scope.addImage = function(urlImage) {

		var arraySize = $scope.imgSrcList.length;
		console.log("arraySize = " + arraySize);

		$scope.imgSrcList[arraySize] = {src: urlImage,};
	}

	var result = imanagefact.sendImgDispositionProperties($scope.screenList, $scope.NbParallelScreen, $scope.NbPerpendicularScreen, $scope.imgSrcList[0].src);
	console.log(result);
	/*$("#identify").click(function () {
			socket.emit("identification", JSON.stringify())
		});*/
	/*
		$("#disconnect").click(function () {
			socket.emit("remove", $("#number").val());
		});*/
};