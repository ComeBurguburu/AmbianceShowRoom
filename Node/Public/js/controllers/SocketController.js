angular.module('App').controller('socketController', socketCrtFnt);

socketCrtFnt.$inject = ['$scope', '$log', 'sockserv'];

function socketCrtFnt($scope, $log, sockserv) {

    $scope.screenList = [];

    $scope.imgSrcList = [];


    /*   $scope.NbParallelScreen; // = 2;
       $scope.NbPerpendicularScreen; // = 4;

       $scope.fillScreenList = function () {
               $scope.screenList[0] = {
                   width: 400,
                   height: 400,
                   X: 0,
                   Y: 0
               };
               $scope.screenList[1] = {
                   width: 400,
                   height: 400,
                   X: 20,
                   Y: 0
               };
               $scope.screenList[2] = {
                   width: 385,
                   height: 400,
                   X: 50,
                   Y: 50
               };
               $scope.screenList[3] = {
                   width: 420,
                   height: 400,
                   X: 10,
                   Y: 60
               };
               $scope.screenList[4] = {
                   width: 410,
                   height: 400,
                   X: 0,
                   Y: 20
               };
               $scope.screenList[5] = {
                   width: 380,
                   height: 400,
                   X: 40,
                   Y: 60
               };
               $scope.screenList[6] = {
                   width: 400,
                   height: 400,
                   X: 0,
                   Y: 20
               };
               $scope.screenList[7] = {
                   width: 400,
                   height: 400,
                   X: 0,
                   Y: 0
               };
           }
           //$scope.fillScreenList();*/

    $scope.fillImgSrcList = function () {
        $scope.imgSrcList[0] = {
            src: "../images/0.jpg"
        };
        $scope.imgSrcList[1] = {
            src: "../images/1.jpg"
        };
        $scope.imgSrcList[2] = {
            src: "../images/2.jpg"
        };
        $scope.imgSrcList[3] = {
            src: "../images/3.jpg"
        };
        $scope.imgSrcList[4] = {
            src: "../images/4.jpg"
        };
        $scope.imgSrcList[5] = {
            src: "../images/5.jpg"
        };
        $scope.imgSrcList[6] = {
            src: "../images/6.jpg"
        };
        $scope.imgSrcList[7] = {
            src: "../images/7.jpg"
        };
        $scope.imgSrcList[8] = {
            src: "../images/8.jpg"
        };
        $scope.imgSrcList[9] = {
            src: "../images/9.jpg"
        };
        $scope.imgSrcList[10] = {
            src: "../images/Clone.jpg"
        };
        $scope.imgSrcList[11] = {
            src: "../images/Dark-Vador.jpg"
        };
        $scope.imgSrcList[12] = {
            src: "../images/Luke.jpg"
        };
        $scope.imgSrcList[13] = {
            src: "../images/whatever.jpg"
        };
    }
    $scope.fillImgSrcList();

    /* $scope.addWatcher = function (information) {

         var i = 0;
         var arraySize;
         if ($scope.screenList.length != undefined) {
             arraySize = $scope.screenList.length;
             for (i = 0; i < information.length; i++) {
                 $scope.screenList[arraySize + i] = {
                     width: information[i].width,
                     height: information[i].height,
                     X: information[i].X,
                     Y: information[i].Y
                 };
             }
         } else {
             arraySize = 0;
             $scope.screenList[arraySize] = {
                 width: information[arraySize].width,
                 height: information[arraySize].height,
                 X: information[arraySize].X,
                 Y: information[arraySize].Y
             };
         }

         console.log("new watcher : ");
         console.log($scope.screenList);
     }

     $scope.addImage = function (urlImage) {

         var arraySize = $scope.imgSrcList.length;
         console.log("arraySize = " + arraySize);

         $scope.imgSrcList[arraySize] = {
             src: urlImage,
         };
     }

     var result = imanagefact.sendImgDispositionProperties($scope.screenList, $scope.NbParallelScreen, $scope.NbPerpendicularScreen, $scope.imgSrcList[0].src);
     console.log(result);*/

    function callback(ret) {
        $scope.error = ret.error;
        $scope.info = ret.info;

        $scope.list = ret.list;
        $scope.me = ret.me;
        /* if (ret.list != undefined) {
             $scope.addWatcher(ret.list);
         }*/
      //  console.log($scope.list);
        $scope.$apply();
        //$scope.addWatcher($scope.info);
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