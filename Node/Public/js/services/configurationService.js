angular.module('configService', []).service('configserv', confFnc);

confFnc.$inject = ['sockserv'];

function confFnc(sockserv) {

    function config(wlist) {

        //var wlist = $scope.dashboard.widgets;
        var i, screen = {
            col: 0,
            row: 0,
            screenlist: []
        };
        for (i = 0; i < wlist.length; i++) {
            screen.screenlist.push({
                id: wlist[i].id,
                col: wlist[i].col/2,
                row: wlist[i].row
            });
            if (wlist[i].col/2 > screen.col) {
                screen.col = wlist[i].col/2;
            }
            if (wlist[i].row > screen.row) {
                screen.row = wlist[i].row;
            }
        }
        sockserv.emit("configuration", screen);
        return screen;
    }

    return {
        config: config
    };
}