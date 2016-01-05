
angular.module('App').controller('dropzoneController', function ($scope) {
    $scope.centerAnchor = true;
    $scope.toggleCenterAnchor = function () {$scope.centerAnchor = !$scope.centerAnchor}
    $scope.draggableObjects = [{name:'one', src:'../images/0.jpg'}, {name:'two', src:'../images/1.jpg'}, {name:'three', src:'../images/2.jpg'}];
    $scope.droppedObjects1 = [];
    $scope.droppedObjects2= [];

    // var img = document.createElement("img");
    // img.src = "../images/0.jpg";
    // var src = document.getElementById("connard");
    // src.appendChild(img);

    $scope.onDropComplete1=function(data,evt){

        var index = $scope.droppedObjects1.indexOf(data);
        if (index == -1)
         $scope.droppedObjects1[0]=data;
    }
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
    $scope.onDropComplete2=function(data,evt){
        var index = $scope.droppedObjects2.indexOf(data);
        if (index == -1) {
            $scope.droppedObjects2[0]=data;
        }
    }
    var inArray = function(array, obj) {
        var index = array.indexOf(obj);
    }
  });
