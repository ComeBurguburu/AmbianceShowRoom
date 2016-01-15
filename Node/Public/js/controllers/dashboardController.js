/*
	Github
*/

angular.module('App')

.controller('DashboardCtrl', ['$scope', 'userService', 'sockserv',


	function ($scope, userService, sockserv) {
        //Options for Gridster system
        $scope.gridsterOptions = {
            margins: [0, 0],
            columns: 6,
            resize: {
                enabled: false
            },
            draggable: {
                handle: 'div'
            },
            widget_base_dimensions: [100, 140],
            serialize_params: function ($w, wgd) {
                return {
                    id: $w.prop("id"),
                    col: wdg.col,
                    row: wdg.row,
                    size_x: wdg.size_x,
                    size_y: wdg.size_y,
                    test: true
                }
            }
        };

        $scope.dashboards = userService.RecoverDashboard();

        //Clear all widget from dashboard
        $scope.clear = function () {
            $scope.dashboard.widgets = [];
        };
       
        function callback(ret) {

            $scope.clear();
            var index;
           
            for (index = 0; index < ret.widgets.length; index++) {
                if (ret.widgets[index].admin === true) {
                    continue;
                }
                var user = detect.parse(ret.widgets[index].userAgent);
                $scope.dashboard.widgets.push({
                    name: "Screen " + ret.widgets[index].id,
                    OS:user.os.name,
                    browser: user.family,
                    row: ret.widgets[index].row,
                    col: ret.widgets[index].col,
                    type: 0,
                    id: ret.widgets[index].id,
                    content: "image"

                });

            }


            $scope.$apply();

        }

        sockserv.grid.init(callback)

       /* $scope.getWidget = function () {
            console.log($scope.privategetWidget());
        }
        $scope.privategetWidget = function () {
            var wlist = $scope.dashboard.widgets;
            var screen = {
                col: 0,
                row: 0,
                screenlist: []
            };
            for (var i = 0; i < wlist.length; i++) {
                screen.screenlist.push({
                    id: wlist[i].id,
                    col: wlist[i].col,
                    row: wlist[i].row
                });
                if (wlist[i].col > screen.col) {
                    screen.col = wlist[i].col;
                }
                if (wlist[i].row > screen.row) {
                    screen.row = wlist[i].row;
                }
            }
            sockserv.emit("configuration", screen);
            return screen;
        }*/
        $scope.$watch('selectedDashboardId', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.dashboard = $scope.dashboards[newVal];
            } else { //Should never happend ? 
                $scope.dashboard = $scope.dashboards[1];

            }
        });

        // choose the Dashboard '1' when first load.
        $scope.selectedDashboardId = '1';
}])


.controller('CustomWidgetCtrl', ['$scope','sockserv',
	function ($scope,sockserv) {

            $scope.remove = function (widget) {
                var index = $scope.dashboard.widgets.indexOf(widget);
                $scope.dashboard.widgets.splice(index, 1);
                sockserv.grid.remove(widget.id);
            };
        
        $scope.drop=function(){
            var wlist = $scope.dashboard.widgets;
            var screen = {
                col: 0,
                row: 0,
                screenlist: []
            };
            for (var i = 0; i < wlist.length; i++) {
                screen.screenlist.push({
                    id: wlist[i].id,
                    col: wlist[i].col,
                    row: wlist[i].row
                });
                if (wlist[i].col > screen.col) {
                    screen.col = wlist[i].col;
                }
                if (wlist[i].row > screen.row) {
                    screen.row = wlist[i].row;
                }
            }
            sockserv.emit("configuration", screen);
            console.log("drop");
            return screen;
        
        }
    
    $scope.drop();
    }
]);