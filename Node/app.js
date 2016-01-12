// app.js
"use strict";

var express = require("express");
var http = require("http");
var path = require("path");
var multer = require("multer");


//var defaultRoute = require("./app/routes/route.js");
var IOController = require("./app/controllers/io.controller.js");
var bodyParser = require("body-parser");
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

/*
	var mySlide = new slidModel(JSON.stringify({
		type: utils.getFileType(mime_type),
		id: uuid,
		title: originalName,
		fileName: filename,
		src: "../" + target_path
	}));
	*/
/*
	slidModel.create(mySlide, function (err, data) {
		if (err) {
			console.error(err);
			response.send(err);
		} else {
			response.send("picture uploaded");
		}
	});
	*/
});


app.use("/", express.static(path.join(__dirname, "Public")));
app.use("/socket", express.static(path.join(__dirname, "Public/socket")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.post('/test',function(req,res){
//   // var user_name=req.body.user;
//   // var password=req.body.password;
//   console.log("req : " +req);
//   res.end("Image sent");
// });
// app.get('/test',function(req,res){
//   // var user_name=req.body.user;
//   // var password=req.body.password;
//   console.log("req : " +req);
//   res.end("yes");
// });
// app.post("/upload", function (){        
// 		var fileInput = document.querySelector('#file');

//         fileInput.addEventListener('change', function() {
//             var xhr = new XMLHttpRequest();
//             xhr.open('POST', '/upload'); // Rappelons qu'il est obligatoire d'utiliser la méthode POST quand on souhaite utiliser un FormData
//             xhr.addEventListener('load', function() {
//                 alert('Upload terminé !');
//             }, false);
//             // Upload du fichier…
//         }, false););
// 	});
	//app.use(defaultRoute);