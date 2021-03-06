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
                col: (wlist[i].col),
                row: (wlist[i].row)
            });
            if ((wlist[i].col) > screen.col) {
                screen.col = (wlist[i].col);
            }
            if ((wlist[i].row) > screen.row) {
                screen.row = (wlist[i].row);
            }
        }
		console.info(screen);
        sockserv.emit("configuration", screen);
        return screen;
    }

    return {
        config: config
    };
}