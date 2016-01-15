angular.module('App').controller('socketController', socketCrtFnt);

socketCrtFnt.$inject = ['$scope', '$log', 'sockserv'];

function socketCrtFnt($scope, $log, sockserv) {

    $scope.screenList = [];

    $scope.imgSrcList = [];

    function callback(ret) {
        $scope.error = ret.error;
        $scope.info = ret.info;

        $scope.list = ret.list;
        $scope.me = ret.me;
        /* if (ret.list != undefined) {
             $scope.addWatcher(ret.list);
         }*/
        $scope.$apply();
    }
    sockserv.init(callback);

}
