"use strict";

var CONFIG = {contentDirectory:"Public/images/"};
var path = require("path");
var fs = require("fs");

//module			//constructor
var FileData = function FileData(json) {

	//public
	this.id = null;
	this.src = null;
	this.type = null;
	this.fileName = null;
	this.videoType = null;
	this.videoSrc = null;
	
	//private
	var data = null;

	this.getData = function () {
		return FileData.data;
	}

	this.setData = function (d) {
		FileData.data = d;
	}

	if (json === undefined) {
		return;
	}

	if (typeof json !== "object") {
		try {
			json = JSON.parse(json)
		} catch (e) {
			console.error(e);
			return;
		}
	}


	if (json.id) {
		this.id = json.id;
	} else {
		console.error("no id");
	}

	if (json.src) {
		this.src = json.src;
	} else {
		console.error("no src");
	}

	if (json.type) {
		this.type = json.type;
	} else {
		console.error("no type");
	}

	if (json.fileName) {
		this.fileName = json.fileName;
	} else {
		console.error("no fileName");
	}

	if (json.videoType) {
		this.videoType = json.videoType;
	} else {
		console.error("no videoType");
	}

	if (json.videoSrc) {
		this.videoSrc = json.videoSrc;
	} else {
		console.error("no videoSrc");
	}

	if (json.data) {
		this.setData(json.data);
	} else {
		this.setData(null);
	}

	if (json.src) {
		this.src = json.src;
	}

}

FileData.pict = function (response, callback, filePath) {
	var i, obj = [],
		cpt = 0;
	fs.readdir(filePath[0].contentDirectory, function (error, data_dir) {

		var dir = filePath[0].contentDirectory; // your directory
		data_dir = data_dir.sort(function (a, b) {
			return fs.statSync(path.join(dir, a)).mtime.getTime() -
				fs.statSync(path.join(dir, b)).mtime.getTime();
		});

		var j = 0;
		if (error) {
			return console.error(error);
		}

		for (i = 0; i < data_dir.length; i++) {
			var file = path.join(dir, data_dir[i]);
			var data = fs.readFileSync(file, "utf-8");

			var json = {};
			
			//json = JSON.parse(data.toString());
			json.id = j;
			json.src = process.env.ADDRESS + "images/" + data_dir[i];
            json.type = 'image';
			obj.push(json);
			//obj[j] = json;
			j = j + 1;
		
			cpt++;

		}; //loop end	


	fs.readdir(filePath[1].contentDirectory, function (error, data_dir) {

		var dir = filePath[1].contentDirectory; // your directory
		data_dir = data_dir.sort(function (a, b) {
			return fs.statSync(path.join(dir, a)).mtime.getTime() -
				fs.statSync(path.join(dir, b)).mtime.getTime();
		});

		var j = 0;
		if (error) {
			return console.error(error);
		}

		for (i = 0; i < data_dir.length; i++) {
			var file = path.join(dir, data_dir[i]);
			var data = fs.readFileSync(file, "utf-8");

			var json = {};
			
			//json = JSON.parse(data.toString());
			json.id = j;
			json.filename = process.env.ADDRESS + "videos/" + data_dir[i];
			obj.push(json);
			//obj[j] = json;
			j = j + 1;
		
			cpt++;

		}; //loop end	

		callback(null, JSON.stringify(obj));
		return;

	});
	});
}

module.exports = FileData;