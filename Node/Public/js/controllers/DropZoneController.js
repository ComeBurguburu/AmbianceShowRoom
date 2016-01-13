angular.module('App').controller('dropzoneController', ['$scope', 'sockserv', '$timeout', function ($scope, sockserv, $timeout) {

    $scope.centerAnchor = true;
    $scope.imageSelected = false;
    $scope.me=null
    $scope.toggleCenterAnchor = function () {
        $scope.centerAnchor = !$scope.centerAnchor
    }
    $scope.draggableObjects = [{
        id: 0,
        src: '../images/0.jpg'
    }, {
        id: 1,
        src: '../images/1.jpg'
    }, {
        id: 2,
        src: '../images/2.jpg'
    }, {
        id: 3,
        src: '../images/3.jpg'
    }, {
        id: 4,
        src: '../images/4.jpg'
    }, {
        id: 5,
        src: '../images/5.jpg'
    }, {
        id: 6,
        src: '../images/6.jpg'
    }, {
        id: 7,
        src: '../images/7.jpg'
    }, {
        id: 8,
        src: '../images/8.jpg'
    }, {
        id: 9,
        src: '../images/9.jpg'
    }, {
        id: 10,
        src: '../images/10.jpg'
    }, {
        id: 11,
        src: '../images/11.jpg'
    }, {
        id: 12,
        src: '../images/12.jpg'
    }, {
        id: 13,
        src: '../images/13.jpg'
    }, {
        id: 14,
        src: '../images/14.jpg'
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
    console.log("****************************************************************************************");
    dropbox.addEventListener("drop", function (evt) {
            console.log('drop evt:');
            console.log(JSON.parse(JSON.stringify(evt.dataTransfer)));
            evt.stopPropagation();
            evt.preventDefault();
            console.log(evt.dataTransfer.files);
            var files = evt.dataTransfer.files;
            console.log("files : ");
            console.log(files);
            if (files.length > 0) {
                //$scope.$apply(function () {
                    $scope.files = [];
                    for (var i = 0; i < files.length; i++) {
                        $scope.files.push(files[i]);
                        console.log("$scope.files : ");
                        console.log($scope.files);
                    }
                    $scope.uploadFile();
                //});
            }
        }, false);
        //============== DRAG & DROP =============

    $scope.setFiles = function (element) {
        $scope.$apply(function ($scope) {
            console.log('files:', element.files);
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
        if (index == -1)
            console.log(idEcran);

        $scope.droppedObjects1[idEcran.id] = clone(data);
        sockserv.send(idEcran.id, data.src, $scope.isGrid);
        console.log($scope.isGrid);
        console.log($scope.imageSelected);
        if ($scope.isGrid == true) {
            $scope.imageSelected = true;
            console.log($scope.isGrid);
            console.log($scope.imageSelected);

        }

    }
    $scope.currentImage = {};
    $scope.currentImage.id = $scope.draggableObjects[0].id;
    $scope.currentImage.src = $scope.draggableObjects[0].src;

    $scope.nextImage = function () {

        if ($scope.currentImage.id == $scope.draggableObjects.length - 1) {
            $scope.currentImage.id = 0;
        } else {
            $scope.currentImage.id++;
        }

        $scope.currentImage.src = $scope.draggableObjects[$scope.currentImage.id].src;

    }

    $scope.previousImage = function () {
        if ($scope.currentImage.id === 0) {
            $scope.currentImage.id = $scope.draggableObjects.length - 1;
        } else {
            $scope.currentImage.id--;
        }

        $scope.currentImage.src = $scope.draggableObjects[$scope.currentImage.id].src;

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
        $scope.me=me
     }
    $scope.initialise = function () {
        console.log("Scope vaut:")
        console.log($scope.me);
        $scope.currentScreen = {};
        $scope.currentScreen.id = 0;
        if($scope.currentScreen.id == $scope.me){
          $scope.currentScreen.id++;  
        }

    }

    $scope.initialise();

    $scope.nextScreen = function (list, me) {
        console.log($scope.currentScreen.id);
        var nextScreenId=$scope.currentScreen.id+1;
        if ($scope.nextScreenId == list[list.length - 1].id && $scope.nextScreenId == me) {
            console.log("cas 1");
            $scope.currentScreen.id = 0;
        } 
        else if (nextScreenId == me) {
            console.log("cas 2");
            $scope.currentScreen.id=$scope.currentScreen.id+2;
        }

        else if ($scope.currentScreen.id == list[list.length - 1].id){
            console.log("cas 3");
            if(list[0].id == me) {
               $scope.currentScreen.id = 1; 
            } else {
                $scope.currentScreen.id = 0; 
            }
        }
        else {
            console.log("cas 4");
            $scope.currentScreen.id++;
        }

    }

    $scope.previousScreen = function (list, me) {

        if ($scope.currentScreen.id == 0) {
            $scope.currentScreen.id = list[list.length - 1].id;
        } else {
            console.log("id dif de 0");
            $scope.currentScreen.id--;
            if ($scope.currentScreen.id == me) {
                if ($scope.currentScreen.id == 0) {
                    $scope.currentScreen.id = list[list.length - 1].id;
                } else {
                    $scope.currentScreen.id--;
                }

            }
        }
    }


    var inArray = function (array, obj) {
        var index = array.indexOf(obj);
    }
  }]);