'use strict';

var fs = require("fs");
var path = require("path");
var CONFIG = JSON.parse(process.env.CONFIG);

module.exports = this;

this.generateUUID = function() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});
	return uuid;
};

this.fileExists = function(path, callback) {
	fs.stat(path, function(err, stat) {
		if (err) {
			callback(err);
		} else {
			if (stat.isFile()) {
				callback(null);
			}
		}
	});
}

this.readFileIfExists = function(path, callback) {
	this.fileExists(path, function(err) {
		if (err) {
			callback(err);
		} else {
			fs.readFile(path, callback);
		}
	});
}

this.getMetaFilePath = function(id) {
	return path.join(CONFIG.contentDirectory, id + ".meta.json");
}

this.getDataFilePath = function(fileName) {
	return path.join(CONFIG.contentDirectory, fileName);
}

this.getNewFileName = function(id, originalFileName) {
	return id + '.' + originalFileName.split('.').pop();
}

this.getFileType = function(fileType) {
	if (fileType.match("image/*")) {
		return "IMG_B64";
	} else if (fileType.search("video")) {
		return "VIDEO_CUSTOM";
	}
};
