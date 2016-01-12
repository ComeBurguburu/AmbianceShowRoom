var isFullscreen = false;

function FullScreen() {
    "use strict";
    var
        el = document.documentElement,
        rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen,
        cfs = el.cancelFullScreen || el.mozCancelFullScreen || document.webkitCancelFullScreen || el.msCancelFullScreen;

    /* if (isFullscreen === true) {
         cfs.call(el);
     } else {*/
    rfs.call(el);
    /*}
    isFullscreen = !isFullscreen;*/
}