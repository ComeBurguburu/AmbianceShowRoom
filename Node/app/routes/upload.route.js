// app.js
"use strict";

var express = require("express");
var http = require("http");
var path = require("path");
var multer = require("multer");

var IOController = require("./../controllers/io.controller.js");

var fs = require("fs");
var path = require("path");
var router = express.Router();


module.exports = router;

var multerMiddleware = multer({
	"dest": "tmp/"
});

var CurrentFolder;

router.post("/file-upload", multerMiddleware.single("file"), function (request, response) {

	console.log("(request.file) : ");
	console.log(request.file);

	var fieldname = request.file.fieldname;
	var originalname = request.file.originalname;
	// var encoding = request.file.encoding;
	var mimetype = request.file.mimetype;
	var destination = request.file.destination;
	var filename = request.file.filename;
	var _path = request.file.path;
	var size = request.file.size;

	var target_path;
	var videoType = null;
	var videoSrc = null;
	var fileType = mimetype.substring(0, mimetype.indexOf('/'));
	console.log(fileType);

	if (mimetype == 'video/mp4'){

		request.file.destination = "Public/videos";
		destination = request.file.destination;

		request.file.path = 'tmp/' + filename;;
		_path = request.file.path;

		CurrentFolder = 'Public/videos';
		target_path = 'Public/videos/' + originalname;

		videoType = mimetype.substring(0, mimetype.indexOf('/'));
		videoSrc = target_path;
	}else{

		request.file.destination = "Public/images";
		destination = request.file.destination;

		request.file.path = 'tmp/' + filename;;
		_path = request.file.path;

		CurrentFolder = 'Public/images';
		target_path = 'Public/images/' + originalname;
	}

	var src = fs.createReadStream(_path);
	var dest = fs.createWriteStream(target_path); //target_path);
	src.pipe(dest);

	src.on('end', function () {
		console.log("end");
	});
	src.on('error', function (err) {
		console.error(err);
	});
});