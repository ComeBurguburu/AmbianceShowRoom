angular.module('App').controller('DemoCtrl', ['$scope', 'sockserv', function($scope, sockserv) {

  $scope.possibilityLine= [0,1,2,3];
  $scope.possibilityColumn= [0,1,2,3];
  $scope.valuesScreen = [[],[],[]];
  $scope.lineList= [];
  $scope.columnList= [];




  $scope.updateLine = function(selectedLine){
    // console.log(selectedLine);
    $scope.lineList=[];
    for(i=0;i<selectedLine;i++){
      $scope.lineList[i]=i;
    }
  }

  $scope.updateColumn = function(selectedColumn){
    $scope.columnList=[];
    for(i=0;i<selectedColumn;i++){
      $scope.columnList[i]=i;
    }
  }

  $scope.updateGrid = function(i,j,selectedScreen){
    $scope.valuesScreen[j][i]=selectedScreen;
  }
 

  $scope.submitData = function () {
    
    var screen = {
        col: parseInt($scope.columnList.length),
        row: parseInt($scope.lineList.length),
        screenlist: []
    };
    
    for(line in $scope.valuesScreen){
        if($scope.valuesScreen[line].length==0){
          console.log("ce tableau est vide");
        }
        else{
          for(col in $scope.valuesScreen[line]){
              screen.screenlist.push({
              id: parseInt($scope.valuesScreen[line][col]),
              col: parseInt(col),
              row: parseInt(line)
              });
          }
        }
    }
    console.log(screen);
    sockserv.emit("configuration", screen);
    return screen;
  }


}]);