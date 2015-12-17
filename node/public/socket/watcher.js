/*global io*/
var socket = io.connect();
/**
 * Envoi d'un message
 */
socket.on('connection',function(msg){
		socket.emit("register");
		alert(msg);
});
socket.on('Event',function(msg){
	alert(msg);
});
socket.on('identification',function(id){
	document.getElementById("identity").innerText=id;
});
socket.on('disconnect', function(){
	alert("server is offline");
});
