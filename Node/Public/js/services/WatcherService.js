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
                userAgent: navigator.userAgent,
                row: -1,
                col: -1
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
            ret.list = undefined;
            callback(ret);
            this.off("connection");
        });
        socket.on('identification', function (id) {
            ret.me = id;
            ret.error="";
            callback(ret);
        });

        socket.on("image", function (obj) {
            ret.img = obj;
            console.log(obj);
            callback(ret);
        });
        
        socket.on("pause",function(){
            callback({videostate:"pause",info:"someone pause the video"})
        });
        
        socket.on("play",function(){
            callback({videostate:"play",info:"someone play the video"})
        })


        socket.on("test", function (log) {
            console.log(log);
        });

        window.onbeforeunload = function () {
            socket.emit("disconnect");
        }
        window.onresize = function () {
            var info = {
                width: window.innerWidth,
                height: window.innerHeight,
                userAgent: navigator.userAgent,
                row: -1,
                col: -1
            }
            socket.emit("register", JSON.stringify(info));
        }


    }
    function pause(){
        socket.emit("video","pause");
    }
    function play(){
        socket.emit("video","play")
    }

    return {
        init: init,
        play:play,
        pause:pause
    }
}