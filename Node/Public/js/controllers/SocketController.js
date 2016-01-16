angular.module('App').controller('socketController', socketCrtFnt);

socketCrtFnt.$inject = ['$scope', '$log', 'sockserv'];

function socketCrtFnt($scope, $log, sockserv) {

    $scope.screenList = [];

    $scope.imgSrcList = [];

    $scope.video = false;


    $scope.video_action = function () {
        $scope.video === true ? sockserv.play() : sockserv.pause();
        $scope.video = !$scope.video;
    }



    function callback(ret) {
        $scope.error = ret.error;
        $scope.info = ret.info;
        $scope.list = ret.list;
        $scope.me = ret.me;
        $scope.$apply();
    }
    sockserv.init(callback);

}