angular.module('AppWatcher').controller('watcherController', ['$scope', 'watcherserv', function ($scope, watcherserv) {

    function callback(ret) {

        $scope.error = ret.error;
        $scope.info = ret.info;
        $scope.list = ret.list;
        $scope.left = undefined; //reset left parameter


        $scope.me = ret.me;

        if (ret.img === undefined) {
            $scope.$apply();
            return;
        }

        $scope.src = ret.img.url;
        $scope.type = ret.img.type;
        $scope.video = ret.img.video;
        //$scope.left = 0;
        //console.log(ret.img);
        //alert(JSON.stringify(ret.img));

        if (ret.img.type === "video") {

            ret.img.left = ret.img.left - 15 / 100 * ret.img.width;

        }



        if (ret.img.left !== undefined) {
            $scope.left = ret.img.left + (isNaN(ret.img.left) ? "" : "px");
            $scope.top = ret.img.top + (isNaN(ret.img.top) ? "" : "px");
        }




        //  console.info(ret.img.width);
        $scope.width = "" + ret.img.width + (isNaN(ret.img.width) ? "" : "px");
        // console.info($scope.width);
        $scope.height = "" + ret.img.height + (isNaN(ret.img.width) ? "" : "px")
            // console.log(ret.img);
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