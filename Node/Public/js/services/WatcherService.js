/*global io, angular*/
"use strict";
angular.module('watcherService', []).service('watcherserv', sockFnc);
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

            ret.error = "";
            ret.info = "";

            var info = {
                width: window.innerWidth,
                height: window.innerHeight,
                browser: navigator.appCodeName,
                plateform: navigator.platform,
                version: parseInt(navigator.appVersion, 10),
                row: -1,
                col: -1,
                sizeX: 1,
                sizeY: 1
            }
            socket.emit("register", JSON.stringify(info));
        });
        socket.on('disconnect', function () {
            ret.info = "";
            ret.error = "server is offline";
            callback(ret);
        });
        socket.emit('Event', 'message test');
        socket.on('EventError', function (msg) {
            ret.error = msg;
            ret.info = "";
            this.off("connection");
        });
        socket.on('identification', function (id) {
            ret.me = id;
            callback(ret);
        });

        socket.on("image", function (obj) {
            ret.img = obj;
            console.log(obj);
            callback(ret);
        });


        socket.on("test", function (log) {
            console.log(log);
        });

        window.onbeforeunload = function () {
            socket.emit("disconnect");
        }
        window.onresize = function () {
            socket.emit("register", JSON.stringify(info));
        }


    }

    return {
        init: init
    }
}