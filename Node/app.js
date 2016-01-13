// app.js
"use strict";

var express = require("express");
var http = require("http");
var path = require("path");
var multer = require("multer");


//var defaultRoute = require("./app/routes/route.js");
var IOController = require("./app/controllers/io.controller.js");
var fs = require("fs");
var path = require("path");
var app = express();


// init server
var  server  = http.createServer(app);
server.listen(1337);
//server.listen(80);
IOController.listen(server);

var multerMiddleware = multer({
	"dest": "../uploads/"
});

app.post("/file-upload", multerMiddleware.single("file"), function (request, response) {

	var _path = request.file.name;
	// var originalName = request.file.originalname
	// var mime_type = request.file.mimetype;
	var size = request.file.size;
	// var uuid = utils.generateUUID();
	// var filename = uuid + path.extname(originalName);

	var target_path = '../uploads/' + filename;

	var src = fs.createReadStream(_path);
	var dest = fs.createWriteStream(target_path);
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