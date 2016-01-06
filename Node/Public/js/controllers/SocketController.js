angular.module('App').controller('socketController', socketCrtFnt);

socketCrtFnt.$inject=['$scope','$log','sockserv','imanagefact'];

function socketCrtFnt($scope, $log, sockserv, imanagefact){

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
			$scope.$apply();
			console.log("$scope.info" + ret.info);
			console.log("$scope.list" + ret.list);
		}
		sockserv.init(callback);
	}

	$scope.screenList = [{width: 400, height: 400, X:0, Y:0}, 
						{width: 400, height: 400, X:20, Y:0},
						{width: 385, height: 400, X:50, Y:50},
						{width: 420, height: 400, X:10, Y:60},
						{width: 410, height: 400, X:0, Y:20},
						{width: 380, height: 400, X:40, Y:60},
						{width: 400, height: 400, X:0, Y:20},
						{width: 400, height: 400, X:0, Y:0}
						];

	$scope.imgSrcList = [{src: "../images/0.jpg"}, 
						{src: "../images/1.jpg"}, 
						{src: "../images/2.jpg"},
						{src: "../images/3.jpg"},
						{src: "../images/4.jpg"},
						{src: "../images/5.jpg"},
						{src: "../images/6.jpg"},
						{src: "../images/7.jpg"},
						{src: "../images/8.jpg"},
						{src: "../images/9.jpg"},
						{src: "../images/10.jpg"}
						];

	$scope.NbParallelScreen = 2;
	$scope.NbPerpendicularScreen = 4;

	$scope.addWatcher = function(information) {

		var arraySize = $scope.screenList.length;
		console.log("arraySize = " + arraySize);

		$scope.screenList[arraySize] = {
											width: information.width,
											height: information.height,
											X: 0,
											Y: 0
										};
		/*
		var imgDisposition = [];
		var numberCurrentScreen = 0;
		var heightMax = 0; //= screenlist[numberCurrentScreen].height - screenlist[numberCurrentScreen].Y;
		var widthMax = 0;
		var ligne = 0, colonne = 0;
		var numberCurrentScreenParallele = 0;
		var numberCurrentScreenPerpendiculaire = 0;
		console.log("dans le service");

		for(ligne=0; ligne < nbscreenparallele; ligne++){
			for(colonne=0; colonne < nbscreenperpendiculaire; colonne++){
				if (screenlistfact[numberCurrentScreen] != undefined){
					imgDisposition[numberCurrentScreen] = {
						left: widthMax + screenlistfact[numberCurrentScreen].X , //(numberCurrentScreenPerpendiculaire/nbscreenperpendiculaire)*widthMax,
			        	top: heightMax + screenlistfact[numberCurrentScreen].Y, //(numberCurrentScreenParallele/nbscreenparallele)*heightMax,
			        	URL: srcImg,
			    		width: screenlistfact[numberCurrentScreen].width,
			    		height: screenlistfact[numberCurrentScreen].height
					};
					widthMax = widthMax + screenlistfact[numberCurrentScreen].width;
					numberCurrentScreen ++;
					numberCurrentScreenPerpendiculaire++;
				}
			}
			numberCurrentScreenPerpendiculaire = 0;
			widthMax = 0;
			if (screenlistfact[numberCurrentScreen] != undefined){
				heightMax = heightMax + screenlistfact[numberCurrentScreen].height;
			}
			numberCurrentScreenParallele++;
		}
	    return imgDisposition;
	};*/
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