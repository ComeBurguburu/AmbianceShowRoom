/*global io*/
$("#error,#info").hide();

var socket = io.connect();
/**
 * Envoi d'un message
 */
socket.on('connection', function (msg) {
	$("#error,#info").hide();
	var info = {
		width: window.innerWidth,
		height: window.innerHeight,
		browser: navigator.appCodeName,
		plateform: navigator.platform,
		version: parseInt(navigator.appVersion, 10)
	}
	socket.emit("register", JSON.stringify(info));
});
socket.on('Event', function (msg) {
	$("#error,#info").hide();
	$("#info").text(msg).show();
});
socket.on('EventError', function (msg) {
	$("#error,#info").hide();
	$("#error").text(msg).show();
});
socket.on('identification', function (id) {
	document.getElementById("identity").innerText = id;
});
socket.on('disconnect', function () {
	$("#error,#info").hide();
	$("#error").text("server is offline").show();
});