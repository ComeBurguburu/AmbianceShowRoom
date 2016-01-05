"use strict";
var io = require('socket.io');

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
					console.log("transfert");
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

		socket.on('register', function (data) {
			var json = "";

			if (data instanceof Object) {
				json = data;
			}

			try {
				json = JSON.parse(data);
			} catch (e) {

			}

			if (mapSocket.indexOf(this) != -1) {
				this.emit("identification", mapSocket.indexOf(this));

			} else {
				var index = getFirstEmpty();
				mapSocket[index] = this;
				this.emit("identification", mapSocket.indexOf(this));
				mapInfo[index] = json;
				mapInfo[index].id = index;
			}
			updateList();


		});

		socket.on('disconnect', function () {
			var id = mapSocket.indexOf(this);
			mapSocket[id] = null;
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
			mapSocket[obj.id].emit("image", obj);
		})

	});

	function updateList() {

		var s;
		for (s in mapSocket) {
			if (mapSocket[s] !== undefined && mapSocket[s] !== null) {
				mapSocket[s].emit("list", JSON.stringify(mapInfo));
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
}
module.exports = controller;