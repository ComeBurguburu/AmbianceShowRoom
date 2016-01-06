angular.module('App').controller('dropzoneController', ['$scope' ,'sockserv', function ($scope, sockserv) {

    $scope.centerAnchor = true;
    $scope.toggleCenterAnchor = function () {$scope.centerAnchor = !$scope.centerAnchor}
    $scope.draggableObjects = [{id: 0, src:'../images/0.jpg'}, {id:1, src:'../images/1.jpg'}, {id:2, src:'../images/2.jpg'}];
    $scope.droppedObjects1 = [];
    $scope.droppedObjects2= [];


    $scope.onDropComplete1=function(data,evt){

        var index = $scope.droppedObjects1.indexOf(data);
        if (index == -1)
        $scope.droppedObjects1[0]=data;
        console.log(data);
        sockserv.send(data.id,data.src);
        
    }

    $scope.onDropComplete2=function(data,evt){
        var index = $scope.droppedObjects2.indexOf(data);
        if (index == -1) {
            $scope.droppedObjects2[0]=data;
        }
    }
    var inArray = function(array, obj) {
        var index = array.indexOf(obj);
    }
  }]);




    // $scope.onDragSuccess1=function(data,evt){
    //     console.log("Bonjour");
    //     var index = $scope.droppedObjects1.indexOf(data);
    //     if (index > -1) {
    //         $scope.droppedObjects1.splice(index, 1);
    //     }
    // }
    // $scope.onDragSuccess2=function(data,evt){
    //     var index = $scope.droppedObjects2.indexOf(data);
    //     if (index > -1) {
    //         $scope.droppedObjects2.splice(index, 1);
    //     }
    // }