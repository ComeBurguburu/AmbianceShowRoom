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

			ret.error = "";
			ret.info = "";

			var info = {
				width: window.innerWidth,
				height: window.innerHeight,
				browser: navigator.appCodeName,
				plateform: navigator.platform,
				version: parseInt(navigator.appVersion, 10)
			}
			socket.emit("register", JSON.stringify(info));
		});
		socket.on('disconnect', function () {
			ret.info = "";
			ret.error = "server is offline";
			callback(ret);
		});
		socket.emit('Event', 'message test');

		socket.on("list", function (data) {
			var i, json = JSON.parse(data);
			//console.info(json);

			for (i = 0; i < json.length; i++) {
				ret.list.push(convert(json[i]));
			}
			callback(ret);
		});

		function convert(obj) {
			var a, str = "";
			if (obj === null) {
				return null;
			}
			for (a in obj) {
				str = str + a + " : " + obj[a] + "\n";
			}
			return str;
		}


		window.onbeforeunload = function () {
			socket.emit("disconnect");
		};

	}

	function send(id, url) {
		console.log("Entree dans le send");
		var obj ={};
		obj.id = id;
		obj.url = url;
		socket.emit("image", obj);
	}

	return {
		init: init,
		send: send
	}
}