/*
	TODO
	To delete after tests
*/

function sendImgDispositionProperties(screenlist, nbscreenparallele, nbscreenperpendiculaire, srcImg) {
	// nbscreenparallele = lignes
	// nbscreenperpendiculaire = colonnes

	var imgDisposition = [];
	var numberCurrentScreen = 0;
	var heightMax; //= screenlist[numberCurrentScreen].height - screenlist[numberCurrentScreen].Y;
	var widthMax;
	var ligne = 0, colonne = 0;
/*
	for(ligne=0; ligne < nbscreenparallele; ligne++){
		for(colonne=0; colonne < nbscreenperpendiculaire; colonne++){
			if (screenlist[numberCurrentScreen] != undefined){
				widthMax = widthMax + screenlist[numberCurrentScreen].width - screenlist[numberCurrentScreen].X ;
				numberCurrentScreen++;
			}
		}
		if (screenlist[numberCurrentScreen] != undefined){
			heightMax = heightMax + screenlist[numberCurrentScreen].height - screenlist[numberCurrentScreen].Y;
		}
	}

	if(nbscreenparallele<nbscreenperpendiculaire){
		widthMax = widthMax*(nbscreenparallele/nbscreenperpendiculaire);
	}else{
		heightMax = heightMax*(nbscreenperpendiculaire/nbscreenparallele)
	}

	console.log("widthMax = " + widthMax);
	console.log("heightMax = " + heightMax);
*/
	//numberCurrentScreen = 0;
	var numberCurrentScreenParallele = 0;
	var numberCurrentScreenPerpendiculaire = 0;
	widthMax = 0;
	heightMax = 0;

	for(ligne=0; ligne < nbscreenparallele; ligne++){
		for(colonne=0; colonne < nbscreenperpendiculaire; colonne++){
			if (screenlist[numberCurrentScreen] != undefined){
				imgDisposition[numberCurrentScreen] = {
					left: widthMax + screenlist[numberCurrentScreen].X , //(numberCurrentScreenPerpendiculaire/nbscreenperpendiculaire)*widthMax,
		        	top: heightMax + screenlist[numberCurrentScreen].Y, //(numberCurrentScreenParallele/nbscreenparallele)*heightMax,
		        	URL: srcImg,
		    		width: screenlist[numberCurrentScreen].width,
		    		height: screenlist[numberCurrentScreen].height
				};
				widthMax = widthMax + screenlist[numberCurrentScreen].width;
				numberCurrentScreen ++;
				numberCurrentScreenPerpendiculaire++;
			}
		}
		numberCurrentScreenPerpendiculaire = 0;
		widthMax = 0;
		if (screenlist[numberCurrentScreen] != undefined){
			heightMax = heightMax + screenlist[numberCurrentScreen].height;
		}
		numberCurrentScreenParallele++;
	}
    return imgDisposition;
    //document.body.appendChild(myImg); // L'image est ajoutée au DOM
}


var listEcrans = [];

var obj = {width: 400, height: 400, X:0, Y:0}
listEcrans[0] = obj;
obj = {width: 400, height: 400, X:20, Y:0}
listEcrans[1] = obj;
obj = {width: 385, height: 400, X:50, Y:50}
listEcrans[2] = obj;
obj = {width: 420, height: 400, X:10, Y:60}
listEcrans[3] = obj;
obj = {width: 410, height: 400, X:0, Y:20}
listEcrans[4] = obj;
obj = {width: 380, height: 400, X:40, Y:60}
listEcrans[5] = obj;
obj = {width: 400, height: 400, X:0, Y:20}
listEcrans[6] = obj;
obj = {width: 400, height: 400, X:0, Y:0}
listEcrans[7] = obj;

var result = sendImgDispositionProperties(listEcrans, 2, 4, "../images/0.jpg");
console.log(result);
