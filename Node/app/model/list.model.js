"use strict";

var CONFIG = {contentDirectory:"Public/images/"};
var path = require("path");
var fs = require("fs");
var utils = require("../utils/utils.js");

//module			//constructor
var FileData = function FileData(json) {

	//public
	this.id = null;
	this.src = null;
	this.type = null;
	this.fileName = null;
	this.videoType = null;
	this.videoSrc = null;
	
	//private
	var data = null;

	this.getData = function () {
		return FileData.data;
	}

	this.setData = function (d) {
		FileData.data = d;
	}

	if (json === undefined) {
		return;
	}

	if (typeof json !== "object") {
		try {
			json = JSON.parse(json)
		} catch (e) {
			console.error(e);
			return;
		}
	}


	if (json.id) {
		this.id = json.id;
	} else {
		console.error("no id");
	}

	if (json.src) {
		this.src = json.src;
	} else {
		console.error("no src");
	}

	if (json.type) {
		this.type = json.type;
	} else {
		console.error("no type");
	}

	if (json.fileName) {
		this.fileName = json.fileName;
	} else {
		console.error("no fileName");
	}

	if (json.videoType) {
		this.videoType = json.videoType;
	} else {
		console.error("no videoType");
	}

	if (json.videoSrc) {
		this.videoSrc = json.videoSrc;
	} else {
		console.error("no videoSrc");
	}

	if (json.data) {
		this.setData(json.data);
	} else {
		this.setData(null);
	}

	if (json.src) {
		this.src = json.src;
	}

}

FileData.list = function (response, callback) {
	var i, fileArray = [],
		cpt = 0;
	fs.readdir(CONFIG.contentDirectory, function (error, data_dir) {

		var j = 0;

		for (i = 0; i < data_dir.length; i++) {
			var file = path.join(CONFIG.contentDirectory, data_dir[i]);
			fs.readFile(file, "utf-8", function (err, data) {
				if (err) {
					console.error(err);
					callback(err);
					return;
				}

				var json = "";
				try {
					json = JSON.parse(data.toString());
					fileArray[j] = json.id;
					j = j + 1;
				} catch (e) {

				}

				cpt++;
				if (cpt == data_dir.length - 1) {

					if (fileArray != []) {
						callback(null, JSON.stringify(fileArray));
					} else {
						console.error(error);
						callback(error);
					}
					return;
				}
			});
		}; //loop end	
	});
}

FileData.create = function (fileList, callback) {
	if (typeof fileList.id !== "string") {
		callback("fileList corrupted no id:" + JSON.stringify(fileList));
	} else if (typeof fileList.fileName !== "string") {
		callback("fileList corrupted no fileName:" + JSON.stringify(fileList));
	} else {

		fs.writeFile(path.join(CONFIG.contentDirectory, fileList.id + ".meta.json"), JSON.stringify(fileList), function (err, data) {
			if (err) {
				callback(err);
			} else {
				callback(null);
			}
		});
	}

}

FileData.read = function (id, callback) {
	var myPath = path.join(CONFIG.contentDirectory, id + ".meta.json");

	fs.stat(myPath, function (err, data) {
		if (err) {
			callback(err);
		}
		fs.readFile(myPath, "utf-8", function (err, data) {
			if (err) {
				callback(err);
			} else {
				callback(null, new FileData(JSON.parse(data)));
			}
		});
	});

}

FileData.update = function (fileList, callback) {
	if (fileList.getData() != null && fileList.getData().length > 0) {
		FileData.read(fileList.id, function (err, fileData) {
			if (err) {
				callback(err);
				return;
			}
			FileData.create(fileList, callback);
		});
	}
}
FileData.list = function (response,adress, callback) {
	var i, fileArray = [],
		cpt = 0;
	fs.readdir(CONFIG.contentDirectory, function (error, data_dir) {

		var j = 0;

		for (i = 0; i < data_dir.length; i++) {
			var file = path.join(CONFIG.contentDirectory, data_dir[i]);
			fs.readFile(file, "utf-8", function (err, data) {
				if (err) {
					console.error(err);
					callback(err);
					return;
				}

				//	if (path.extname(file) == '.json') { // added to avoid the problem of .png files

				var json = "";
				try {
					json = JSON.parse(data.toString());
					fileArray[j] = json.id;
					j = j + 1;
				} catch (e) {

				}


				//	}
				cpt++;
				if (cpt == data_dir.length - 1) {

					if (fileArray != []) {
						callback(null, JSON.stringify(fileArray));
					} else {
						console.error(error);
						callback(error);
					}
					return;
				}
			});
		}; //loop end	

	});
}
FileData.loadPres = function (response, callback) {
	var i, fileArray = [],
		cpt = 0;
	fs.readdir(CONFIG.presentationDirectory, function (error, data_dir) {

		var j = 0;

		for (i = 0; i < data_dir.length; i++) {
			var file = path.join(CONFIG.presentationDirectory, data_dir[i]);

			fs.readFile(file, "utf-8", function (err, data) {
				if (err) {
					console.error(err)
					callback(err);
					return;
				}

				//	if (path.extname(file) == '.json') { // added to avoid the problem of .png files

				var json = "";
				try {
					json = JSON.parse(data.toString());
					fileArray[j] = json;
					j = j + 1;
				} catch (e) {

				}


				//	}
				cpt++;
				if (cpt == data_dir.length) {

					if (fileArray != []) {
						var obj = {
							"id": "00002",
							"title": "nototo",
							"description": "Welcome to this first présentation do you need some help?",
							"fileArray": fileArray
						};
						//callback(null, JSON.stringify([obj]));
						callback(null, JSON.stringify(fileArray));
					} else {
						callback(error);
					}
					return;
				}
			});
		}; //loop end	

	});
}
FileData.savePres = function (request, response) {
	var json_string = "";

	request.on("data", function (data) {
		json_string += data.toString();
	});
	request.on("end", function () {

		var json = null;
		try {
			json = JSON.parse(json_string);
		} catch (e) {
			console.log(":" + json_string);
			response.send("json corrupted: " + json_string);
		}
		if (json != null) {
			fs.writeFile(path.join(CONFIG.presentationDirectory, json.id + ".pres.json"), json_string, function (err) {
				if (err) {
					response.send(err)
				}
				var f = path.join(CONFIG.presentationDirectory, json.id + ".pres.json")
				console.log(f);
				response.send("save success");
			});
		}

	});
};
FileData.pict = function (response, callback) {
	var i, obj = [],
		cpt = 0;
	fs.readdir(CONFIG.contentDirectory, function (error, data_dir) {

		var dir = CONFIG.contentDirectory; // your directory
		data_dir = data_dir.sort(function (a, b) {
			return fs.statSync(path.join(dir, a)).mtime.getTime() -
				fs.statSync(path.join(dir, b)).mtime.getTime();
		});

		var j = 0;
		if (error) {
			return console.error(error);
		}

		for (i = 0; i < data_dir.length; i++) {
			var file = path.join(CONFIG.contentDirectory, data_dir[i]);
			console.log(file);
			var data = fs.readFileSync(file, "utf-8");

			var json = {};
			
			//json = JSON.parse(data.toString());
			json.id = j;
			json.filename = process.env.ADDRESS + "images/" + data_dir[i];
			obj.push(json);
			//obj[j] = json;
			j = j + 1;
		
			cpt++;

		}; //loop end	
		callback(null, JSON.stringify(obj));
		return;

	});
}

FileData.delete = function (id, callback) {

	FileData.read(id, function (err, fileList) {
		if (err) {
			callback(err);
			return;
		}
		if (fileList.fileName == null) {
			callback("no filename");
			return;
		}
		var path_img = path.join(CONFIG.contentDirectory, fileList.fileName);


		utils.readFileIfExists(path_img, function (err, data) {
			if (err) {
				callback(err);
				return;
			} else {
				fs.unlink(data, function (err, data) {});
				var path2 = path.join(CONFIG.contentDirectory, id.toString() + ".meta.json");

				utils.readFileIfExists(path2, function (err, data) {
					if (err) {
						callback(null);
						return;
					} else {
						fs.unlink(data, function (err, data) {});
						callback(null);
					}
				});

			}
		})
	})
}
//
module.exports = FileData;