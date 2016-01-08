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
//app.use(defaultRoute);