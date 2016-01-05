/*global io*/
"use strict";
$("#error").hide();
var socket = io.connect();
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
socket.on('disconnect', function () {
	$("#error,#info").hide();
	$("#error").text("server is offline").show();;
});
socket.emit('Event', 'message test');
/*$("#identify").click(function(){
	var 
	socket.emit("register",JSON.stringify())
});*/
$("#disconnect").click(function () {
	socket.emit("remove", $("#number").val());
});
socket.on("list", function (data) {
	var i, json = JSON.parse(data);
	console.info(json);
	$("ul").empty();
	for (i = 0; i < json.length; i++) {
		$("ul").append($(document.createElement("li")).text(convert(json[i])));
	}
});

function convert(obj) {
	var a, str = "";
	for (a in obj) {
		str = str + a + " : " + obj[a] + "\n";
	}
	return str;
}