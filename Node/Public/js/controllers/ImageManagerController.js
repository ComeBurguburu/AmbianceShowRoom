/*
angular.module('App').controller('ImageManagerController', ['$scope', 'ImManageServ', function ($scope, ImManageServ) {

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

	console.log("connard");

	var result = ImManageServ.sendImgDispositionProperties($scope.screenlist, $scope.NbParallelScreen, $scope.NbPerpendicularScreen, $scope.imgSrcList[0].src);
	console.log(result);
}]);

*/