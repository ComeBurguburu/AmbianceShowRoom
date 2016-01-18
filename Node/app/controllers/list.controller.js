"use strict";
var CONFIG = "Public/";

var path = require("path");
var fs = require("fs");
var FileListModel = require("./../model/list.model.js");

var FileListController = function () {}


FileListController.pict = function (request, response, callback) {

		FileListModel.pict(response, function (err, data, filePath) {
			if (err) {
				console.error(err)
				callback(err);
				return;
			}
			response.send(data);
		});
}

module.exports = FileListController;