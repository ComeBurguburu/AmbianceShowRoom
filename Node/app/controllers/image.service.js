var image = function () {};
var extend = require('extend');

image.sendImgDispositionProperties = function (screenlistfact, nbrligne, nbrcolonne, obj) {
    var imgDisposition = [];
    var numberCurrentScreen = 0;
    var heightMax = 0;
    var widthMax = 0;
    var ligne = 0,
        colonne = 0;

    for (ligne = 0; ligne < nbrligne; ligne++) {
        for (colonne = 0; colonne < nbrcolonne; colonne++) {
            

            if (screenlistfact[numberCurrentScreen] != undefined) {
                
                imgDisposition[numberCurrentScreen]= extend({},screenlistfact[numberCurrentScreen],obj, {
                    left: -(widthMax),
                    top: -heightMax,
                    width: screenlistfact[numberCurrentScreen].width * nbrcolonne,
                    height: screenlistfact[numberCurrentScreen].height * nbrligne,
                    id: screenlistfact[numberCurrentScreen].id,
                });
                widthMax = widthMax + screenlistfact[numberCurrentScreen].width;
                numberCurrentScreen++;
            }
        }
        widthMax = 0;
        if (screenlistfact[numberCurrentScreen] != undefined) {
            heightMax = heightMax + screenlistfact[numberCurrentScreen].height;
        }
    }
    return imgDisposition;
}
module.exports = image;