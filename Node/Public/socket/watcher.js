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
		version: parseInt(navigator.appVersion, 10),
		X: screenX,
		Y: screenY
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
	this.off("connection");

});
socket.on('identification', function (id) {
	document.getElementById("identity").innerText = id;
});
socket.on('disconnect', function () {
	$("#error,#info").hide();
	$("#error").text("server is offline").show();
});
socket.on("image", function (obj) {
	console.log(obj);
});
window.onbeforeunload = function () {
	socket.emit("disconnect");
}
