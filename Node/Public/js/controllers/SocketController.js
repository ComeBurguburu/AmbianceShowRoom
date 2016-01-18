"use strict";
angular.module('App').controller('socketController', socketCrtFnt);

socketCrtFnt.$inject = ['$scope', '$log', 'sockserv','$q','$http'];

function socketCrtFnt($scope, $log, sockserv,$q,$http) {
    
    
    
   

    $scope.video = false;

    $scope.video_action = function () {
        $scope.video === true ? sockserv.play() : sockserv.pause();
        $scope.video = !$scope.video;
    }



    function callback(ret) {
        $scope.error = ret.error;
        $scope.info = ret.info;

        if (ret.list !== undefined && ret.list.length !== 0) {
            $scope.list = ret.list;
        }

        if (ret.me !== undefined) {
            $scope.me = ret.me;
        }
        $scope.$apply();
    }
    
    sockserv.init(callback);
}