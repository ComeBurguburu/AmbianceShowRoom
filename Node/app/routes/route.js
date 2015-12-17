"use strict";

var multer = require("multer");
var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");

module.exports = router;

var multerMiddleware = multer({
	"dest": "tmp/"
});
router.post("/file-upload", multerMiddleware.single("file"), function (request, response) {

	var _path = request.file.path
	var originalName = request.file.originalname
	var mime_type = request.file.mimetype;
	var uuid = utils.generateUUID();
	var filename = uuid + path.extname(originalName);

	var target_path = 'uploads/' + filename;

	var src = fs.createReadStream(_path);
	var dest = fs.createWriteStream(target_path);
	src.pipe(dest);

	src.on('end', function () {
		console.log("end");
	});
	src.on('error', function (err) {
		console.error(err);
	});


	var mySlide = new slidModel(JSON.stringify({
		type: utils.getFileType(mime_type),
		id: uuid,
		title: originalName,
		fileName: filename,
		src: "../" + target_path
	}));

	slidModel.create(mySlide, function (err, data) {
		if (err) {
			console.error(err);
			response.send(err);
		} else {
			response.send("it work");
		}
	});
});
