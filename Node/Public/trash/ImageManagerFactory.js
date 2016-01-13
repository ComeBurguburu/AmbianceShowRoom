// "use strict";
angular.module('imageManagerFactory', []).factory('imanagefact', iManageFnc);

function iManageFnc(){
	var factory = {};
	
	factory.sendImgDispositionProperties = function(screenlistfact, nbscreenparallele, nbscreenperpendiculaire, srcImg) {
		var imgDisposition = [];
		var numberCurrentScreen = 0;
		var heightMax = 0; //= screenlist[numberCurrentScreen].height - screenlist[numberCurrentScreen].Y;
		var widthMax = 0;
		var ligne = 0, colonne = 0;
		var numberCurrentScreenParallele = 0;
		var numberCurrentScreenPerpendiculaire = 0;

		for(ligne=0; ligne < nbscreenparallele; ligne++){
			for(colonne=0; colonne < nbscreenperpendiculaire; colonne++){
				if (screenlistfact[numberCurrentScreen] != undefined){
					imgDisposition[numberCurrentScreen] = {
						left: widthMax + screenlistfact[numberCurrentScreen].X, //(numberCurrentScreenPerpendiculaire/nbscreenperpendiculaire)*widthMax,
			        	top: heightMax + screenlistfact[numberCurrentScreen].Y, //(numberCurrentScreenParallele/nbscreenparallele)*heightMax,
			        	URL: srcImg,
			    		width: screenlistfact[numberCurrentScreen].width,
			    		height: screenlistfact[numberCurrentScreen].height
					};
					widthMax = widthMax + screenlistfact[numberCurrentScreen].width;
					numberCurrentScreen ++;
					numberCurrentScreenPerpendiculaire++;
				}
			}
			numberCurrentScreenPerpendiculaire = 0;
			widthMax = 0;
			if (screenlistfact[numberCurrentScreen] != undefined){
				heightMax = heightMax + screenlistfact[numberCurrentScreen].height;
			}
			numberCurrentScreenParallele++;
		}
	    return imgDisposition;
	};

	return factory;
};