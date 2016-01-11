"use strict";
var io = require('socket.io');
var image = require('./image.service.js');

var mapSocket = [],
    mapInfo = [];

var controller = function () {};



controller.listen = function (server) {


    var ioServer = io.listen(server);
    ioServer.set('log level', 1);

    var obj;

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

        socket.on('identification', function () {
            this.emit("identification", mapSocket.indexOf(this));
        })

        socket.on('register', function (data) {
            var json = "";

            if (data instanceof Object) {
                json = data;
            }

            try {
                json = JSON.parse(data);
            } catch (e) {

            }

            if (mapSocket.indexOf(this) == -1) {
                var index = getFirstEmpty();
                mapSocket[index] = this;
                mapInfo[index] = json;
                mapInfo[index].id = index;
            }
            console.log('connect client ' + mapSocket.indexOf(this));
            this.emit("identification", mapSocket.indexOf(this));
            updateList();


        });

        socket.on('disconnect', function () {

            var id = mapSocket.indexOf(this);
            mapSocket[id] = null;
            mapInfo[id] = null;
            updateList();
        });



        socket.on("remove", function (number) {
            if (isNaN(number) || mapSocket[number] === undefined || mapSocket[number] === null) {
                console.log(number);
                return;
            }
            mapSocket[number].emit("EventError", "you have been disconnected");
            mapSocket[number] = null;
            mapInfo[number] = null
            updateList();
        });

        socket.on("image", function (obj) {
            //testImage();
            console.log("lien image reçu");
            //console.log(obj);
            if (mapSocket[obj.id] === undefined || mapSocket[obj.id] === null) {
                console.log("error " + obj.id);
                return;
            }

            var mapReceiver = splitImage(2, 2, obj.url);

            if (obj.isGrid === true) { //parametrable

                for (var id = 0; id < mapSocket.length; id++) {
                    if (mapSocket[id] !== undefined && mapSocket[id] !== null) {
                        mapSocket[id].emit("image", search(mapReceiver, id));
                    }
                }
            } else {
                mapSocket[obj.id].emit("image", obj);

            }

        })

    });

    function search(map, id) {
        var result = map.filter(function (x) {
            return x.id === id;
        });
        if (result.length === 0) {
            return;
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

    function splitImage(row, col, url) {

        var r = mapInfo.filter(function (a) {
            return a !== null && a.admin !== true;
        });

        return image.sendImgDispositionProperties(r, row, col, url);
    }



    function testImage() {
        var r = mapInfo.filter(function (a) {
            return a !== null && a.admin !== true;
        });
        console.log("before:");
        console.log(r[0]);
        console.log("");
        console.log("after:");
        var tab = image.sendImgDispositionProperties(r, 3, 1, "coucou");
        console.log(tab[0]);

        var s;
        for (s in mapSocket) {
            if (mapSocket[s] !== undefined && mapSocket[s] !== null) {
                //mapSocket[s].emit("test", JSON.stringify(r));
                mapSocket[s].emit("test", JSON.stringify(tab));
            }
        }

    }


}
module.exports = controller;