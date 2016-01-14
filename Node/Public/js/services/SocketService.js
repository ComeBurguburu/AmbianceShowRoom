/*global io, angular*/
"use strict";
angular.module('socketService', []).service('sockserv', sockFnc);
var socket;

function sockFnc() {
    function init(callback) {
        if (!callback instanceof Function) {
            return console.error("sockserv callback is not a function");
        }


        var ret = {
            error: "",
            info: "",
            list: []
        };

        socket = io.connect();
        console.log("socket ready");
        socket.on('connection', function (msg) {

            var info = {
                width: window.innerWidth,
                height: window.innerHeight,
                row: -1,
                col: -1,
                userAgent: navigator.userAgent,
                admin: true
            };
            socket.emit("register", JSON.stringify(info));
        });
        socket.on('identification', function (id) {
            ret.me = id;
            callback(ret);
        });
        socket.on("EventError", function (error_message) {
            callback({
                info: "",
                error: error_message
            });

        })


        socket.on('disconnect', function () {
            ret.info = "";
            ret.error = "server is offline";
            callback(ret);
        });
        socket.emit('Event', 'message test');

        socket.on("update", function (data) {
            ret.update = data;
        });


        socket.on("list", function (data) {
            console.log("event list trig");
            var i, json = JSON.parse(data);
            ret.list = [];
            //console.info(json);

            for (i = 0; i < json.length; i++) {
                ret.list.push(json[i]);
            }

            callback(ret);
        });

        window.onbeforeunload = function () {
            socket.emit("disconnect");
        };

    }

    function send(id, url, isGrid, typeOfData) {
        // typeOfData means the type of file (image, video, feed ...)
        console.log("Entree dans le send");
        var obj = {};
        obj.id = id;
        obj.url = url;
        obj.isGrid = isGrid;
        obj.col = 2;
        obj.row = 2;
        obj.type = typeOfData;
        socket.emit("image", obj);
    }

    function test(log) {
        socket.emit("test", log);
    }

    function remove_widget(index) {
        socket.emit("remove", index);
    }

    function emit(event, data) {
        socket.emit(event, data);
    }

    function init_grid(c) {
        socket.on("list", function (list) {
            c({
                widgets: JSON.parse(list)
            });
        })


    }

    return {
        init: init,
        test: test,
        emit: emit,
        send: send,

        grid: {
            init: init_grid,
            remove: remove_widget,
        }
    };
}