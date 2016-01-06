angular.module('App').controller('dropzoneController', ['$scope' ,'sockserv', function ($scope, sockserv) {

    $scope.centerAnchor = true;
    $scope.toggleCenterAnchor = function () {$scope.centerAnchor = !$scope.centerAnchor}
    $scope.draggableObjects = [{id: 0, src:'../images/0.jpg'}, {id:1, src:'../images/1.jpg'}, {id:2, src:'../images/2.jpg'}];
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


