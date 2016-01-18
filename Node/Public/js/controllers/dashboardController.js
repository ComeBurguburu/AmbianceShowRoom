/*
	Github
*/

angular.module('App')

.controller('DashboardCtrl', ['$scope', 'userService', 'sockserv','configserv',


	function ($scope, userService, sockserv,confserv) {
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
            widget_base_dimensions: [100, 100],
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
        $scope.dashboard = $scope.dashboards[1];


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
                    OS: user.os.name,
                    browser: user.browser.family,
                    row: ret.widgets[index].row,
                    col: ret.widgets[index].col,
                    type: 0,
                    id: ret.widgets[index].id,
                    content: "image"

                });

            }
            $scope.$apply();
            confserv.config($scope.dashboard.widgets);
        }

        sockserv.grid.init(callback);
}])


.controller('CustomWidgetCtrl', ['$scope', 'sockserv','configserv',
	function ($scope, sockserv,confserv) {

        $scope.remove = function (widget) {
            var index = $scope.dashboard.widgets.indexOf(widget);
            $scope.dashboard.widgets.splice(index, 1);
            sockserv.grid.remove(widget.id);
        };

        $scope.drop = function () {
            confserv.config($scope.dashboard.widgets);
             console.log("drop");
        }
    }
]);