// app.js
"use strict";

var express = require("express");
var http = require("http");
var path = require("path");
var multer = require("multer");

var IOController = require("./app/controllers/io.controller.js");
var FileListController = require("./app/controllers/list.controller.js");

var fs = require("fs");
var path = require("path");
var app = express();

var utils = require("./app/utils/utils.js");
var FileData = require("./app/model/list.model.js");


// init server
var  server  = http.createServer(app);
server.listen(1337);
//server.listen(80);
IOController.listen(server);

var multerMiddleware = multer({
	"dest": "tmp/"
});

var CurrentFolder;

app.post("/file-upload", multerMiddleware.single("file"), function (request, response) {

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
		// console.log(destination);

		request.file.path = 'tmp/' + filename;;
		_path = request.file.path;
		// console.log(_path);

		CurrentFolder = 'Public/videos';
		target_path = 'Public/videos/' + originalname;

		videoType = mimetype.substring(0, mimetype.indexOf('/'));
		videoSrc = target_path;
	}else{

		request.file.destination = "Public/images";
		destination = request.file.destination;
		// console.log(destination);

		request.file.path = 'tmp/' + filename;;
		_path = request.file.path;
		// console.log(_path);

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


app.get("/files",function(request,response){

	var CONFIG = {
					contentDirectory:"Public/images/"
				 };
	FileData.pict(response,function(err,a){
		response.send(a);
	});

	/*
	var myFile = new FileData(JSON.stringify({
		id: filename,
		src: target_path,
		type: fileType,
		fileName: originalname,
		videoType: mimetype,
		videoSrc: target_path
	}));

	FileData.create(myFile, function (err, data) {
		if (err) {
			console.error(err);
			response.send(err);
		} else {
			response.send("file uploaded");
		}
	});*/
});



app.use("/", express.static(path.join(__dirname, "Public")));
app.use("/socket", express.static(path.join(__dirname, "Public/socket")));

app.get("/slids/:slidId", function (request, response) {
	var id = request.params.slidId;
	console.log(id);
	SlidController.read(id, function (erreur, data) {
		response.send(data);
		console.log(data);
		console.log(erreur);
	}, request.query.json);
});