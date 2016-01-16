angular.module('AppWatcher').controller('watcherController', ['$scope', 'watcherserv', function ($scope, watcherserv) {

    $scope.autoplay = true;

    function callback(ret) {

        if (ret.videostate === "play") {
            play();
            $scope.$apply();
            return;
        }
        if (ret.videostate === "pause") {
            pause();
            $scope.$apply();
            return;
        }

        $scope.error = ret.error;
        $scope.info = ret.info;
        $scope.left = undefined; //reset left parameter

        $scope.me = ret.me;

        if (ret.img === undefined) {
            $scope.$apply();
            return;
        }

        $scope.src = ret.img.url;
        $scope.type = ret.img.type;

        if (ret.img.video !== undefined) {
            //$scope.autoplay = ret.isPlay;

            $scope.videoSources = [];
            $scope.videoSources.push(ret.img.video);

        }

        //crop video
        if (ret.img.type === "video" && ret.img.left !== undefined) {
            ret.img.left = ret.img.left + 8 / 100 * ret.img.width;
        }



        if (ret.img.left !== undefined) {
            $scope.left = ret.img.left + (isNaN(ret.img.left) ? "" : "px");
            $scope.top = ret.img.top + (isNaN(ret.img.top) ? "" : "px");
        }

        $scope.width = "" + ret.img.width + (isNaN(ret.img.width) ? "" : "px");
        $scope.height = "" + ret.img.height + (isNaN(ret.img.width) ? "" : "px")
        $scope.$apply();
    }
    watcherserv.init(callback);

    $scope.video = function (e) {
        var videoElements = angular.element(e.srcElement);
        if (videoElements[0].paused) {
            videoElements[0].play();
            watcherserv.play();
        } else {
            videoElements[0].pause();
            watcherserv.pause();
        }
    }


    function play() {
        var videos = document.getElementsByTagName("video");

        if ($scope.left !== undefined) {
            videos[0].play();
        } else {
            videos[1].play();
        }
    }

    function pause() {
        var videos = document.getElementsByTagName("video");
        videos[0].pause();
        videos[1].pause();
    }

}]);