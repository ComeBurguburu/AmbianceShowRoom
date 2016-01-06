"use strict";
angular.module('ImageManagerService', []).service('ImManageServ', ImManageSFnc);

function ImManageSFnc() {
	function sendImgDispositionProperties(screenlist, nbscreenparallele, nbscreenperpendiculaire, srcImg) {
		var imgDisposition = [];
		var numberCurrentScreen = 0;
		var heightMax; //= screenlist[numberCurrentScreen].height - screenlist[numberCurrentScreen].Y;
		var widthMax;
		var ligne = 0, colonne = 0;
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
	}
}