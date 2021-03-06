"use strict";
var io = require('socket.io');
var image = require('./image.service.js');

var mapSocket = [],
    mapInfo = [];

var controller = function () {};



controller.listen = function (server) {


    var obj, ioServer = io.listen(server);
    ioServer.set('log level', 1);

    ioServer.on('connection', function (socket) {
        /**
         * Log de connexion des utilisateurs
         */
        socket.emit('connection', 'I\'m ready');

        socket.on('Event', function (data) {

            obj = data;
            var s;
            for (s in mapSocket) {
                if (mapSocket[s] !== undefined && mapSocket[s] !== null) {
                    mapSocket[s].emit('Event', JSON.stringify(obj));
                }
            }
        });

        socket.on("identify", function (data) {
            var i = 0;
            for (i = 0; i < mapSocket.length; i++) {
                if (mapSocket[i] !== null) {
                    mapSocket[i].emit("identify", null);
                }
            }
        });

        socket.on("video", function (state) {
            if (state !== "play" && state !== "pause") {
                return;
            }
            // //console.log(state);
            var i = 0;
            for (i = 0; i < mapSocket.length; i++) {
                if (mapSocket[i] !== null) {
                    mapSocket[i].emit(state, null);
                }
            }
        });

        socket.on('identification', function () {
            this.emit("identification", mapSocket.indexOf(this));
        });

        socket.on('register', function (data) {
            var json = "";

            if (data instanceof Object) {
                json = data;
            }

            try {
                json = JSON.parse(data);
            } catch (e) {

            }

            var index,
                soket_id = mapSocket.indexOf(this);

            if (soket_id === -1 || mapSocket[soket_id] === null) {
                var index = getFirstEmpty();
                var last = getLast();
                json.row = last.row;
                json.col = last.col;
            } else {
                index = soket_id;
            }
            mapSocket[index] = this;
            mapInfo[index] = json;
            mapInfo[index].id = index;

            //console.log('connect client ' + mapSocket.indexOf(this));
            this.emit("identification", mapSocket.indexOf(this));
            updateList();


        });

        socket.on('disconnect', function () {

            var id = mapSocket.indexOf(this);
            mapSocket[id] = null;
            mapInfo[id] = null;
            updateList();
        });

        socket.on("test", function (log) {
            //console.log("-------------------------------------");
            //console.log(log);
            //console.log("-------------------------------------");
        });

        socket.on("configuration", function (conf) {

            //console.log("--conf--");
            // //console.log(":before");
            // //console.log(mapInfo);

            for (var i = 0; i < conf.screenlist.length; i++) {
                for (var j = 0; j < mapInfo.length; j++) {
                    if (mapInfo[j] !== undefined && mapInfo[j] !== null && conf.screenlist[i] !== undefined && conf.screenlist[i] !== null) {
                        if (mapInfo[j].id === conf.screenlist[i].id) {
                            mapInfo[j].row = conf.screenlist[i].row;
                            mapInfo[j].col = conf.screenlist[i].col;
                            mapInfo[j].sizeX = 1;
                            mapInfo[j].sizeY = 1;
                            //console.info(mapInfo[j].id);
                        }
                    }

                }
            }
            console.log("************************************************************");
            log(mapInfo);
            /*  //console.log(":after");
              //console.log(mapInfo);
              //console.log("--end--");
              updateList();
              //console.log(getLast());*/
        });
        socket.on("list", function () {
            updateList();
        })

        socket.on("remove", function (number) {
            if (isNaN(number) || mapSocket[number] === undefined || mapSocket[number] === null) {
                return;
            }
            mapSocket[number].emit("EventError", "you have been disconnected");
            mapSocket[number] = null;
            mapInfo[number] = null;
            updateList();
        });

        socket.on("image", function (obj) {

            if (mapSocket[obj.id] === undefined || mapSocket[obj.id] === null) {
                //console.log("error " + obj.id);
                return;
            }
            var dim = getLast();

            if (obj.isGrid === true) { //parametrable
                var id, mapReceiver;
                mapReceiver = splitImage(dim.row + 1, dim.col + 1, obj);

                for (id = 0; id < mapSocket.length; id++) {
                    if (mapSocket[id] !== undefined && mapSocket[id] !== null) {

                        if (obj.type === "image" || obj.type === "video") {
                            mapSocket[id].emit("image", search(mapReceiver, id));
                            mapSocket[id].emit("update", mapReceiver);
                        } else {
                            mapSocket[id].emit("image", obj);
                            // mapSocket[id].emit("update", mapReceiver);  
                        }

                    }
                }
            } else {
                mapSocket[obj.id].emit("image", obj);
                mapSocket[obj.id].emit("update", mapReceiver);
            }

        })

    });

    function log(map) {
        var i;
        for (i = 0; i < map.length; i++) {
            if (map[i] !== null) {
                console.log("{row: " + map[i].row + " ,col: " + map[i].col + ", id: " + map[i].id + " ,admin :" + (map[i].admin === true) + "}");
            }
        }
        console.log("------------------");

    }

    function search(map, id) {
        
        var result = map.filter(function (x) {
            return x.id === id;
        });
        if (result.length === 0) {

            /*console.info(map.map(function (a) {
                return a.id;
            }));*/
            //console.info(id)

            return {
                error: "error",
                id: id
            };
        }
        return result[0];
    }

    function updateList() {

        var s;
        var map = mapInfo.filter(function (a) {
            return a !== null;
        });
        for (s in mapSocket) {
            if (mapSocket[s] !== undefined && mapSocket[s] !== null) {
                mapSocket[s].emit("list", JSON.stringify(map));
            }
        }
        log(mapInfo);

    }

    function getLast() {
        var i = 0,
            r = 0,
            c = 0;
        for (i = 0; i < mapInfo.length; i++) {
            if (mapInfo[i] !== undefined && mapInfo[i] !== null) {
                if (mapInfo[i].row > r) {
                    r = mapInfo[i].row;
                }
                if (mapInfo[i].col > c) {
                    c = mapInfo[i].col;
                }
            }
        }
        return {
            row: r,
            col: c
        };
    }

    function getFirstEmpty() {
        var i;
        for (i = 0; i < mapSocket.length; i++) {
            if (mapSocket[i] === null) {
                return i;
            }
        }
        return mapSocket.length;
    }

    function splitImage(row, col, obj) {

        var r = mapInfo.filter(function (a) {
            return a !== null && a.admin !== true;
        });

        return image.sendImgDispositionProperties(r, row, col, obj);
    }

};
module.exports = controller;