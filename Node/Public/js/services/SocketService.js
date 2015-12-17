angular.module('socketServices', []).factory('socket', notifyFnc);

function notifyFnc() {
	var socket = {
		notify: notify
	};

	function notify(currentSlide, contentMap) {
		var socket = io.connect();
		var slid = angular.extend({}, currentSlide);

		if (slid !== undefined && slid.contentMap !== undefined && slid.contentMap[1] !== undefined) {
			slid.src = contentMap.payload[slid.contentMap[1]].src;
		}
		socket.emit('slidEvent', JSON.stringify(slid));
	}
	return socket;

}