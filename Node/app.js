// app.js
"use strict";

var express = require("express");
var http = require("http");
var path = require("path");
//var defaultRoute = require("./app/routes/route.js");
var IOController = require("./app/controllers/io.controller.js");
var app = express();

// init server
var  server  = http.createServer(app);
server.listen(1337);
//server.listen(80);
IOController.listen(server);

app.use("/", express.static(path.join(__dirname, "Public")));
app.use("/socket", express.static(path.join(__dirname, "Public/socket")));
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