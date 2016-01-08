var image = function () {};

image.sendImgDispositionProperties = function (screenlistfact, nbrligne, nbrcolonne, srcImg) {
	var imgDisposition = [];
	var numberCurrentScreen = 0;
	var heightMax = 0; //= screenlist[numberCurrentScreen].height - screenlist[numberCurrentScreen].Y;
	var widthMax = 0;
	var ligne = 0,
		colonne = 0;
	var numberCurrentScreenParallele = 0;
	var numberCurrentScreenPerpendiculaire = 0;

	for (ligne = 0; ligne < nbrligne; ligne++) {
		for (colonne = 0; colonne < nbrcolonne; colonne++) {

			if (screenlistfact[numberCurrentScreen] != undefined) {
				imgDisposition[numberCurrentScreen] = {
					left: -(widthMax),// + screenlistfact[numberCurrentScreen].X), //(numberCurrentScreenPerpendiculaire/nbscreenperpendiculaire)*widthMax,
					top: - heightMax ,//+ screenlistfact[numberCurrentScreen].Y, //(numberCurrentScreenParallele/nbscreenparallele)*heightMax,
					url: srcImg,
					width: screenlistfact[numberCurrentScreen].width*nbrcolonne,
					height: screenlistfact[numberCurrentScreen].height*nbrligne,
					X: screenlistfact[numberCurrentScreen].X,
					Y: screenlistfact[numberCurrentScreen].Y,
					id: screenlistfact[numberCurrentScreen].id,
					plateform: screenlistfact[numberCurrentScreen].plateform
				};
				widthMax = widthMax + screenlistfact[numberCurrentScreen].width;
				numberCurrentScreen++;
				numberCurrentScreenPerpendiculaire++;
			}
		}
		numberCurrentScreenPerpendiculaire = 0;
		widthMax = 0;
		if (screenlistfact[numberCurrentScreen] != undefined) {
			heightMax = heightMax + screenlistfact[numberCurrentScreen].height;
		}
		numberCurrentScreenParallele++;
	}
	return imgDisposition;
}
module.exports = image;