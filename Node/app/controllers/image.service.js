var image = function () {};

image.sendImgDispositionProperties = function (screenlistfact, nbrligne, nbrcolonne, srcImg) {
    var imgDisposition = [];
    var numberCurrentScreen = 0;
    var heightMax = 0;
    var widthMax = 0;
    var ligne = 0,
        colonne = 0;

    for (ligne = 0; ligne < nbrligne; ligne++) {
        for (colonne = 0; colonne < nbrcolonne; colonne++) {

            if (screenlistfact[numberCurrentScreen] != undefined) {
                imgDisposition[numberCurrentScreen] = {
                    left: -(widthMax),
                    top: -heightMax,
                    url: srcImg,
                    width: screenlistfact[numberCurrentScreen].width * nbrcolonne,
                    height: screenlistfact[numberCurrentScreen].height * nbrligne,
                    col: screenlistfact[numberCurrentScreen].col,
                    row: screenlistfact[numberCurrentScreen].row,
                    id: screenlistfact[numberCurrentScreen].id,
                    plateform: screenlistfact[numberCurrentScreen].plateform
                };
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