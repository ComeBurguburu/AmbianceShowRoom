var TAILLE_ECRAN = 600;
var NB_ECRANS = 3;


function sendImg(screenlist, nbscreenparallele, nbscreenperpendiculaire, srcImg) {
	// nbscreenparallele = lignes
	// nbscreenperpendiculaire = colonnes

	// var myImg = new Image();
	// myImg.width = widthImg;
	// myImg.height = heightImg;
	// myImg.src = srcImg;

	// myImg.addEventListener('load', function() {

 //    }, false);

/*
screenlist[0].height
screenlist[0].width
*/
	var imgDisposition = [];
	var numberCurrentScreen = 0;
	var heightMax = screenlist[numberCurrentScreen].height;
	var widthMax = 0;
	var ligne = 0, colonne = 0;

//	for (screen in screenlist){
	for(ligne=0; ligne < nbscreenparallele; ligne++){
		for(colonne=0; colonne < nbscreenperpendiculaire; colonne++){
			if (screenlist[numberCurrentScreen] != undefined){
				widthMax = widthMax + screenlist[numberCurrentScreen].width;
				numberCurrentScreen++;
			}
		}
		if (screenlist[numberCurrentScreen] != undefined){
			heightMax = heightMax + screenlist[numberCurrentScreen].height;
		}
	}
//	}

	numberCurrentScreen = 0;
	var numberCurrentScreenParallele = 1;
	var numberCurrentScreenPerpendiculaire = 1;


//	for (screen in screenlist){
	for(ligne=0; ligne < nbscreenparallele; ligne++){
		for(colonne=0; colonne < nbscreenperpendiculaire; colonne++){
			if (screenlist[numberCurrentScreen] != undefined){
				imgDisposition[numberCurrentScreen] = {
					left: (numberCurrentScreenParallele/nbscreenparallele)*widthMax,
		        	top: (numberCurrentScreenPerpendiculaire/nbscreenperpendiculaire)*heightMax,
		        	URL: srcImg,
		    		width: screenlist[numberCurrentScreen].width,
		    		height: screenlist[numberCurrentScreen].height
				};
				numberCurrentScreen ++;
				numberCurrentScreenPerpendiculaire++;
			}
		}
		numberCurrentScreenParallele++;
	}
//	}

    // var obj = [
    //     {
    //         left: 'Lerdorf',
    //         top: 'Gutmans',
    //         URL: 'Suraski',
    //     	width:'',
    //     	height: ''
    //     },{

    //     }]
    //     ;
    return imgDisposition;
    //document.body.appendChild(myImg); // L'image est ajoutée au DOM
}

;
var listEcrans = [];
// listEcrans[0].width = 300;
// listEcrans[0].height = 300;
var obj = {width: 300, height: 300}
listEcrans[0] = obj;
obj = {width: 200, height: 200}
listEcrans[1] = obj;
// listEcrans[1].width = 200;
// listEcrans[1].height = 200;

// listEcrans[2].width = 800;
// listEcrans[2].height = 800;
obj = {width: 800, height: 800}
listEcrans[2] = obj;
// listEcrans[3].width = 500;
// listEcrans[3].height = 500;
obj = {width: 500, height: 500}
listEcrans[3] = obj;
// listEcrans[4].width = 100;
// listEcrans[4].height = 100;
obj = {width: 100, height: 100}
listEcrans[4] = obj;
// listEcrans[5].width = 200;
// listEcrans[5].height = 200;
obj = {width: 200, height: 200}
listEcrans[5] = obj;

var result = sendImg(listEcrans, 4, 2, "../images/0.jpg");
console.log(result);
