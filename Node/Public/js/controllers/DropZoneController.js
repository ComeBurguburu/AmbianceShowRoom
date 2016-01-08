angular.module('App').controller('dropzoneController', ['$scope' ,'sockserv', '$timeout', function ($scope, sockserv, $timeout) {

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
    $scope.currentImage= {};
    $scope.currentImage.id=$scope.draggableObjects[0].id;
    $scope.currentImage.src=$scope.draggableObjects[0].src;

    $scope.nextImage=function(){

        if($scope.currentImage.id===$scope.draggableObjects.length-1){
            $scope.currentImage.id=0;
        } else {
            $scope.currentImage.id++;
        }
        
         $scope.currentImage.src=$scope.draggableObjects[$scope.currentImage.id].src;

    }

    $scope.previousImage=function(){
        if($scope.currentImage.id===0){
            $scope.currentImage.id=$scope.draggableObjects.length-1
        } else {
            $scope.currentImage.id--;
        }
        
         $scope.currentImage.src=$scope.draggableObjects[$scope.currentImage.id].src;

    }
    $scope.initialise = function(){
        $scope.currentScreen={};
        $scope.currentScreen.id=0;
        $scope.currentScreen.src='../images/0.jpg';
    }
    
               $scope.initialise();
                  
    
    $scope.nextScreen=function(list){


         console.log($scope.droppedObjects1);
       console.log(list);
      if($scope.currentScreen.id===list[list.length-1].id){
            $scope.currentScreen.id=0;
        } else {
            $scope.currentScreen.id++;
        }
        
         $scope.currentScreen.src==list[$scope.currentScreen.id].src; 
         


    }


    var inArray = function(array, obj) {
        var index = array.indexOf(obj);
    }
  }]);


