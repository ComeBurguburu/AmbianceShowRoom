"use strict";
var CONFIG = JSON.parse(process.env.CONFIG);

var path = require("path");
var fs = require("fs");
var utils = require("../utils/utils.js");
var FileListModel = require("./../model/list.model.js");

var FileListController = function () {}

FileListController.list = function (request, response, callback) {

	FileListModel.list(response, function (err, data) {
		if (err) {
			response.send(err);
			return;
		}
		response.send(data);
	});
}
FileListController.savePres = function (request, response, callback) {
	FileListModel.savePres(request, response, function (err, data) {
		if (err) {
			console.error(err);
			response.send(err);
			return;
		}
		response.send(data);
	})
}


FileListController.loadPres = function (request, response, callback) {

	FileListModel.loadPres(response, function (err, data) {
		if (err) {
			response.send(err);
			return;
		}
		response.send(data);
	});
}
FileListController.pict = function (request, response, callback) {

		FileListModel.pict(response, function (err, data) {
			if (err) {
				console.error(err)
				callback(err);
				return;
			}
			response.send(data);
		});
	}
	//SlidController.getData = function(){return FileListModel.getData();};

FileListController.create = function (request, response) {
	var content = "";

	request.on("data", function (data) {
		content += data.toString();
	});
	request.on("end", function () {

		var json_string = content;
		FileListModel.create(new FileListModel(json_string));
	});
}

FileListController.read = function (id, callback, json) {
	var myPath = path.join(CONFIG.contentDirectory, id + ".meta.json");
	fs.stat(myPath, function (err, data) {
		if (err) {
			callback("no file in " + myPath);
			return;
		}
		fs.readFile(myPath, "utf-8", function (err, data) {
			if (err) {
				callback(err);
			} else {
				if (json == true) {
					callback(null, JSON.parse(data.toString()));
				} else {
					callback(null, new FileListModel(JSON.parse(data.toString())));
				}
			}
		});
	});
}
module.exports = FileListController;