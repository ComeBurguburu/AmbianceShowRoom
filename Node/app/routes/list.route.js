"use strict";

var express = require("express");
var http = require("http");
var path = require("path");
var multer = require("multer");

var IOController = require("./../controllers/io.controller.js");
var FileListController = require("./../controllers/list.controller.js");

var fs = require("fs");
var path = require("path");
var router2 = express.Router();

var listRoute = require("./../routes/list.route.js");
var FileData = require("./../model/list.model.js");

module.exports = router2;

var multerMiddleware = multer({
	"dest": "tmp/"
});

var CurrentFolder;

router2.get("/files",function(request,response){

	var configPath = [{	
						contentDirectory:"Public/images/"
					 },{
					 	contentDirectory:"Public/videos/"
					 }];
	FileData.pict(response,function(err,a,configPath){
		response.send(a);
	},configPath);

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