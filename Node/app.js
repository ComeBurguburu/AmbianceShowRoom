// app.js
"use strict";

var express = require("express");
var http = require("http");
var path = require("path");
var multer = require("multer");

var IOController = require("./app/controllers/io.controller.js");
// var bodyParser = require("body-parser");
var fs = require("fs");
var path = require("path");
var app = express();

// init server
var  server  = http.createServer(app);
server.listen(1337);
//server.listen(80);
IOController.listen(server);

var multerMiddleware = multer({
	"dest": "tmp/"
});

app.post("/file-upload", multerMiddleware.single("file"), function (request, response) {

	console.log("(request.file) : ");
	console.log(request.file);

	var fieldname = request.file.fieldname;
	var originalname = request.file.originalname;
	var encoding = request.file.encoding;
	var mimetype = request.file.mimetype;
	var destination = request.file.destination;
	var filename = request.file.filename;
	var _path = request.file.path;
	var size = request.file.size;

	var target_path;

	if (mimetype == 'video/mp4'){

		request.file.destination = "Public/videos";
		destination = request.file.destination;
		console.log(destination);

		request.file.path = 'tmp/' + filename;;
		_path = request.file.path;
		console.log(_path);

		target_path = 'Public/videos/' + originalname;
	}else{

		request.file.destination = "Public/images";
		destination = request.file.destination;
		console.log(destination);

		request.file.path = 'tmp/' + filename;;
		_path = request.file.path;
		console.log(_path);

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


app.use("/", express.static(path.join(__dirname, "Public")));
app.use("/socket", express.static(path.join(__dirname, "Public/socket")));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());