"use strict";
var io = require('socket.io');

var mapSocket = [];

var controller = function () {};



controller.listen = function (server) {


	var ioServer = io.listen(server);
	ioServer.set('log level', 1);

	var obj;

	ioServer.on('connection', function (socket) {
		/**
		 * Log de connexion et de déconnexion des utilisateurs
		 */
		socket.emit('connection', 'I\'m ready');


		socket.on('Event', function (data) {

			obj = data;
			var s;
			for (s in mapSocket) {
				if(mapSocket[s]!==undefined){
					mapSocket[s].emit('Event', JSON.stringify(obj));
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
			
			if (mapSocket.indexOf(this) == -1) {
				mapSocket.push(this);
				console.log(Object.keys(mapSocket).length);
				socket.emit("identification",mapSocket.indexOf(this));
				
			}

		});
		
		socket.on('disconnect', function(){
			var id = mapSocket.indexOf(this);
			mapSocket[id]=undefined;
		});

	});
}
module.exports = controller;
