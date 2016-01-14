angular.module('App').controller('dropzoneController', ['$scope', 'sockserv', function ($scope, sockserv) {

    $scope.centerAnchor = true;
    $scope.imageSelected = false;
    $scope.me=null
    $scope.toggleCenterAnchor = function () {
        $scope.centerAnchor = !$scope.centerAnchor
    }
    $scope.draggableObjects = [{
        id: 0,
        src: '../images/0.jpg',
        type: "image"
    }, {
        id: 1,
        src: '../images/1.jpg',
        type: "image"
    }, {
        id: 2,
        src: '../images/2.jpg',
        type: "image"
    }, {
        id: 3,
        src: '../images/3.jpg',
        type: "image"
    }, {
        id: 4,
        src: '../images/4.jpg',
        type: "image"
    }, {
        id: 5,
        src: '../images/5.jpg',
        type: "image"
    }, {
        id: 6,
        src: '../images/6.jpg',
        type: "image"
    }, {
        id: 7,
        src: '../images/7.jpg',
        type: "image"
    }, {
        id: 8,
        src: '../images/8.jpg',
        type: "image"
    }, {
        id: 9,
        src: '../images/9.jpg',
        type: "image"
    }, {
        id: 10,
        src: '../images/10.jpg',
        type: "image"
    }, {
        id: 11,
        src: '../images/11.jpg',
        type: "image"
    }, {
        id: 12,
        src: '../images/12.jpg',
        type: "image"
    }, {
        id: 13,
        src: '../images/13.jpg',
        type: "image"
    }, {
        id: 14,
        src: '../images/14.jpg',
        type: "image"
    }];
    $scope.droppedObjects1 = [];

    function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }
    // $scope.onDragComplete = function(data,evt){

    // }
    /************************************************************************************/

    //============== DRAG & DROP =============
    // source for drag&drop: http://www.webappers.com/2011/09/28/drag-drop-file-upload-with-html5-javascript/

    var dropbox = document.getElementById("dropbox");

    // init event handlers
    function dragEnterLeave(evt) {
        evt.stopPropagation();
        evt.preventDefault();
    }
    dropbox.addEventListener("dragenter", dragEnterLeave, false);
    dropbox.addEventListener("dragleave", dragEnterLeave, false);
    dropbox.addEventListener("dragover", function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var clazz = 'not-available';
        var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0;
    }, false);
    //console.log("****************************************************************************************");
     function ondrop (evt) {
       // console.log("****************************************************************************************");
      //  console.log(JSON.parse(JSON.stringify(evt.dataTransfer)));
        evt.stopPropagation();
        evt.preventDefault();
        var files = evt.dataTransfer.files;
        if (files.length > 0) {
            $scope.files = [];
            for (var i = 0; i < files.length; i++) {
                $scope.files.push(files[i]);
            }
            $scope.uploadFile();
        }
    };
    dropbox.removeEventListener("drop", ondrop);
    dropbox.addEventListener("drop", ondrop, false);

        //============== DRAG & DROP =============

    $scope.setFiles = function (element) {
        $scope.$apply(function ($scope) {
            //console.log('files:', element.files);
            // Turn the FileList object into an Array
            $scope.files = [];
            for (var i = 0; i < element.files.length; i++) {
                $scope.files.push(element.files[i]);
            }
            $scope.progressVisible = false;
        });
    };

    $scope.uploadFile = function () {
        var fd = new FormData();
            // for (var i in $scope.files) {
            //     fd.append("uploadedFile", $scope.files[i])
            // }
        fd.append("file", $scope.files[0]);
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", uploadProgress, false);
        xhr.addEventListener("load", uploadComplete, false);
        xhr.addEventListener("error", uploadFailed, false);
        xhr.addEventListener("abort", uploadCanceled, false);
        xhr.open("POST", "/file-upload");
        $scope.progressVisible = true;
        xhr.send(fd);
        console.log("bien envoyé");
    }

    function uploadProgress(evt) {
        $scope.$apply(function () {
            if (evt.lengthComputable) {
                $scope.progress = Math.round(evt.loaded * 100 / evt.total);
            } else {
                $scope.progress = 'unable to compute';
            }
        });
    }

    function uploadComplete(evt) {
        /* This event is raised when the server send back a response */
        alert(evt.target.responseText);
    }

    function uploadFailed(evt) {
        alert("There was an error attempting to upload the file.");
    }

    function uploadCanceled(evt) {
        $scope.$apply(function () {
            $scope.progressVisible = false;
        });
        alert("The upload has been canceled by the user or the browser dropped the connection.");
    }

    /********************************************************************************************/

    $scope.onDropComplete1 = function (data, evt, idEcran) {

        var index = $scope.droppedObjects1.indexOf(data);

        $scope.droppedObjects1[idEcran.id] = clone(data);
        sockserv.send(idEcran.id, data.src, $scope.isGrid, $scope.droppedObjects1[idEcran.id].type);
    }
    
    $scope.currentImage = {};
    $scope.currentImage.id = $scope.draggableObjects[0].id;
    $scope.currentImage.src = $scope.draggableObjects[0].src;
    $scope.currentImage.type = $scope.draggableObjects[0].type;    

    $scope.nextImage = function () {

        if ($scope.currentImage.id == $scope.draggableObjects.length - 1) {
            $scope.currentImage.id = 0;
        } else {
            $scope.currentImage.id++;
        }

        $scope.currentImage.src = $scope.draggableObjects[$scope.currentImage.id].src;
        $scope.currentImage.type = $scope.draggableObjects[$scope.currentImage.id].type;
    }

    $scope.previousImage = function () {
        if ($scope.currentImage.id === 0) {
            $scope.currentImage.id = $scope.draggableObjects.length - 1;
        } else {
            $scope.currentImage.id--;
        }

        $scope.currentImage.src = $scope.draggableObjects[$scope.currentImage.id].src;
        $scope.currentImage.type = $scope.draggableObjects[$scope.currentImage.id].type;

    }

    $scope.searchNoAdminWatcher = function (list, me) {
        $scope.idWatcher = 0;
            /* {};
                    for (i = 0; i < $scope.list.length; i++) {
                        if (list[i].id != me) {
                            $scope.idWatcher.id = $scope.list[i].id;
                            break;
                        }
                    }*/
    }

     $scope.initialiseMe = function (me) {
        $scope.me=me;
     }
    $scope.initialise = function () {
        
        $scope.currentScreen = {};
        $scope.currentScreen.id = 0;
        if($scope.currentScreen.id == $scope.me){
          $scope.currentScreen.id++;  
        }

    }

    $scope.initialise();

    $scope.nextScreen = function (list, me) {
        
        var nextScreenId=$scope.currentScreen.id+1;
        if (nextScreenId == list[list.length - 1].id && nextScreenId == me) {
            
            $scope.currentScreen.id = 0;
        } 
        else if (nextScreenId == me) {
           
            $scope.currentScreen.id=$scope.currentScreen.id+2;
        }

        else if ($scope.currentScreen.id == list[list.length - 1].id){
           
            if(list[0].id == me) {
               $scope.currentScreen.id = 1; 
            } else {
                $scope.currentScreen.id = 0; 
            }
        }
        else {
           
            $scope.currentScreen.id++;
        }

    }

    $scope.previousScreen = function (list, me) {

        var beforeScreenId=$scope.currentScreen.id-1;
        if (beforeScreenId == 0 && beforeScreenId == me) {
            $scope.currentScreen.id = list[list.length - 1].id;
        } 
        else if (beforeScreenId == me) {
            $scope.currentScreen.id=$scope.currentScreen.id-2;
        }

        else if ($scope.currentScreen.id == list[0].id){
            if(list[list.length - 1].id == me) {
                $scope.currentScreen.id = list[list.length - 2].id; 
            } else {
                $scope.currentScreen.id = list[list.length - 1].id;
            }
        }
        else {
            $scope.currentScreen.id--;
        }
    }


    var inArray = function (array, obj) {
        var index = array.indexOf(obj);
    }
  }]);