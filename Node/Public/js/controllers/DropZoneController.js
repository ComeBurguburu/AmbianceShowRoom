angular.module('App').controller('dropzoneController', ['$scope' ,'sockserv', function ($scope, sockserv) {

    $scope.centerAnchor = true;
    $scope.toggleCenterAnchor = function () {$scope.centerAnchor = !$scope.centerAnchor}
    $scope.draggableObjects = [{id: 0, src:'../images/0.jpg'}, {id:1, src:'../images/1.jpg'}, {id:2, src:'../images/2.jpg'}, {id:3, src:'../images/3.jpg'}, {id:4, src:'../images/4.jpg'}, {id:5, src:'../images/5.jpg'}, {id:6, src:'../images/6.jpg'}, {id:7, src:'../images/7.jpg'}, {id:8, src:'../images/8.jpg'}, {id:9, src:'../images/9.jpg'}];
    $scope.droppedObjects1 = [];
 


    $scope.onDropComplete1=function(data,evt,idEcran){
  
        var index = $scope.droppedObjects1.indexOf(data);
        if (index == -1)
            console.log(idEcran);
        $scope.droppedObjects1[idEcran.id]=data;
        sockserv.send(idEcran.id,data.src);
        
    }

    var inArray = function(array, obj) {
        var index = array.indexOf(obj);
    }
  }]);


