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

var uploadRoute = require("./app/routes/upload.route.js");
var listRoute = require("./app/routes/list.route.js");
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

app.use(uploadRoute);
app.use(listRoute);
app.use("/", express.static(path.join(__dirname, "Public")));
app.use("/socket", express.static(path.join(__dirname, "Public/socket")));