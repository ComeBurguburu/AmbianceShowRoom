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
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
	}
	socket.emit("register", JSON.stringify(info));
});
socket.on('disconnect', function () {
	$("#error,#info").hide();
<<<<<<< Updated upstream
	$("#error").text("server is offline").show();
});
socket.emit('Event', 'message test');
$("#identify").click(function () {
	socket.emit("identification", JSON.stringify())
});
=======
	$("#error").text("server is offline").show();;
});
socket.emit('Event', 'message test');
/*$("#identify").click(function(){
	var 
	socket.emit("register",JSON.stringify())
});*/
>>>>>>> Stashed changes
$("#disconnect").click(function () {
	socket.emit("remove", $("#number").val());
});
socket.on("list", function (data) {
	var i, json = JSON.parse(data);
	console.info(json);
	$("ul").empty();
	for (i = 0; i < json.length; i++) {
<<<<<<< Updated upstream
		$("ul").append(convert(json[i]));
=======
		$("ul").append($(document.createElement("li")).text(convert(json[i])));
>>>>>>> Stashed changes
	}
});

function convert(obj) {
	var a, str = "";
<<<<<<< Updated upstream
	if (obj === null) {
		return null;
	}
	for (a in obj) {
		str = str + a + " : " + obj[a] + "\n";
	}
	return $(document.createElement("li")).text(str);
}

function send(id, obj) {
	obj.id = id;
	socket.emit("image", obj);
}
window.onbeforeunload = function () {
	socket.emit("disconnect");
};
=======
	for (a in obj) {
		str = str + a + " : " + obj[a] + "\n";
	}
	return str;
}
>>>>>>> Stashed changes
