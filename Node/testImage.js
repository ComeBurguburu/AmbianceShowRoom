"use strict";
var image = require("./app/controllers/image.service.js");

var screen = [

    {
        id: 1,
        row: 0,
        col: 0,
        width: 10,
        height: 10
    }, {
        id: 2,
        row: 0,
        col: 1,
        width: 10,
        height: 10
    }, {
        id: 3,
        row: 1,
        col: 0,
        width: 10,
        height: 10
    }, {
        id: 4,
        row: 1,
        col: 1,
        width: 10,
        height: 10
    }
]

var nbrligne = 2,
    nbrcolonne = 2;

var obj = {
    
};


var rep = image.sendImgDispositionProperties(screen, nbrligne, nbrcolonne, obj);
console.log(rep);
console.log(JSON.stringify(rep))