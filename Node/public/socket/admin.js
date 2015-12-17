/*global io*/
var socket = io.connect();
/**
 * Envoi d'un message
 */
socket.on('disconnect', function(){
	alert("server is offline");
});
socket.emit('Event','message test');
