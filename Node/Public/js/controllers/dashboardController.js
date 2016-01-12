/*
	Github
*/

angular.module('App')

.controller('DashboardCtrl', ['$scope', '$timeout', '$compile', "graphService", "userService", //'imanagefact',


	function ($scope, $timeout, $compile, graphService, userService) { //, imanagefact) {
        //Options for Gridster system
        $scope.gridsterOptions = {
            margins: [20, 20],
            columns: 5,
            resize: {
                enabled: false
            },
            draggable: {
                handle: 'h3'
            },
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

        /***********************************************************

        Add a .resize_widget( $widget, [size_x], [size_y], [reposition], [callback] ) qui ne fait rien

        ***********************************************************/

        $scope.dispTypelist = false;
        $scope.ContentList = graphService.RecoverData();
        $scope.typeList = [""];

        $scope.graphContentList = graphService.RecoverDetailGraph();

        //For leaflet Details
        angular.extend($scope, {
            center: {
                lat: 45.783,
                lng: 3.083,
                zoom: 13
            }
        });

        //Data for piechart Exemple
        $scope.examplePieData = [{
            key: "One",
            y: 5
        }, {
            key: "Two",
            y: 2
        }, {
            key: "Three",
            y: 9
        }, {
            key: "Four",
            y: 7
        }, {
            key: "Five",
            y: 4
        }, {
            key: "Six",
            y: 3
        }, {
            key: "Seven",
            y: 9
        }];

        //Data for Line Chart
        $scope.exampleLineData = [{
            "key": "Series 1",
            "values": [[1, 0], [2, -6.33], [3, -5.95], [4, -11.56], [5, -5.47], [6, 0.50], [7, -5.53], [8, -5.78], [9, -7.32], [10, -6.70], [11, 0.44], [12, 7.24], [13, 9.25], [14, 11.34], [15, 14.73], [16, 12.38], [17, 18.43], [18, 19.83], [19, 22.64]]
 		}];

        //for graphe purpose
        $scope.xFunction = function () {
            return function (d) {
                return d.key;
            };
        }
        $scope.yFunction = function () {
            return function (d) {
                return d.y;
            };
        }


        $scope.dashboards = userService.RecoverDashboard();

        //Clear all widget from dashboard
        $scope.clear = function () {
            $scope.dashboard.widgets = [];
        };

        $scope.addId = function () {
            var i = 0;
            var id_tmp = new Array();
            var widgetSize = $scope.dashboard.widgets.length;
            var found = false;
            var result;

            if(widgetSize == 0 || widgetSize==undefined){
                return 0;
            }else{
                for (i = 0; i < widgetSize; i++) {
                    id_tmp.push($scope.dashboard.widgets[i].id);
                }
                id_tmp.sort(function compare(x, y) {return x - y;});

                i = 0;

                while(found==false){
                    for (i = 0; i < id_tmp.length; i++) {
                        if((id_tmp[i]+1)!=(id_tmp[i+1])){
                            result = id_tmp[i]+1;
                            found = true;
                            break;
                        }
                    }
                }
                return result;
            }
        }

        $scope.addIdParam = function (widgetListParam) {
            var i = 0;
            var id_tmp = new Array();
            var widgetSize = widgetListParam.length;
            var found = false;
            var result; // Default

            if(widgetSize == 0 || widgetSize==undefined){
                return 0;
            }else{
                for (i = 0; i < widgetSize; i++) {
                    id_tmp.push(widgetListParam[i].id);
                }
                id_tmp.sort(function compare(x, y) {return x - y;});

                i = 0;

                while(found==false){
                    for (i = 0; i < id_tmp.length; i++) {
                        if((id_tmp[i]+1)!=(id_tmp[i+1])){
                            result = id_tmp[i]+1;
                            found = true;
                            break;
                        }
                    }
                }
                return result;
            }
        }

        //Add a new empty widget to the Dashboard
        $scope.addWidget = function () {
            var widgetSize = $scope.dashboard.widgets.length + 1;
            var idToSet = $scope.addId();
            var widgetName = "Widget " + (idToSet+1);
            $scope.dashboard.widgets.push({
                name: widgetName,
                sizeX: 1,
                sizeY: 1,
                id: idToSet,
            });
            console.log($scope.dashboard);
        };

        $scope.fillGrid = function () {
            $scope.clear();
            var i = 0;
            var widgetId;

            for (i = 0; i < $scope.widgetList.length; i++) {
                if($scope.dashboard.widgets.length==undefined){
                    widgetId = 0;
                }else{
                    widgetId = $scope.dashboard.widgets.length;
                }

                $scope.dashboard.widgets.push({
                    name: $scope.widgetList[i].name,
                    sizeX: $scope.widgetList[i].sizeX,
                    sizeY: $scope.widgetList[i].sizeY,
                    // col: $scope.widgetList[i].col,
                    // row: $scope.widgetList[i].row,
                    id: widgetId,
                    content: $scope.widgetList[i].content,
                    type: $scope.widgetList[i].type,
                });
            }
            console.log($scope.dashboard.widgets);
        };

        $scope.fillGridParam = function (widgetListParam) {
            $scope.clear();
            var i = 0;
            var widgetId;

            for (i = 0; i < widgetListParam.length; i++) {
                if($scope.dashboard.widgets.length==undefined){
                    widgetId = 0;
                }else{
                    widgetId = $scope.dashboard.widgets.length;
                }

                $scope.dashboard.widgets.push({
                    name: widgetListParam[i].name,
                    sizeX: widgetListParam[i].sizeX,
                    sizeY: widgetListParam[i].sizeY,
                    // col: widgetListParam[i].col,
                    // row: widgetListParam[i].row,
                    id: widgetId,
                    content: widgetListParam[i].content,
                    type: widgetListParam[i].type,
                });
            }
        };

        $scope.widgetList = [{
                    name: "widget 1",
                    sizeX: 1,
                    sizeY: 1,
                    col: 0,
                    row: 1,
                    content: "image",
                    type: 0,
				},{
                    name: "widget 2",
                    sizeX: 1,
                    sizeY: 1,
                    col: 1,
                    row: 1,
                    content: "image",
                    type: 0,
				},{
                    name: "widget 3",
                    sizeX: 1,
                    sizeY: 1,
                    col: 2,
                    row: 1,
                    content: "image",
                    type: "whatever",
				},
		];

        $scope.getWidget = function () {
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
            console.info($scope.dashboard.widgets);
            console.log(screen);
        }

/*
        //Save the current dashboard in the 'mon dashboard' item
        $scope.save = function () {
            var widgets = JSON.parse(JSON.stringify($scope.dashboard.widgets));
            var length = Object.keys($scope.dashboards).length;
            if ($scope.dashboards[length].name == "mon dashboard")
                $scope.dashboards[length] = {
                    id: length,
                    name: "mon dashboard",
                    widgets: widgets
                };
            else {
                length++;
                $scope.dashboards[length] = {
                    id: length,
                    name: "mon dashboard",
                    widgets: widgets
                };
            }
            userService.saveDashboard(widgets);
        }
*/


        //To switch between Dashboard
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


.controller('CustomWidgetCtrl', ['$scope', '$modal',
	function ($scope, $modal) {

        $scope.remove = function (widget) {
            $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
            //console.warn("Remove Widget");
        };
        /*
        ******************************************************************************************
        		// SETTINGS POP UP
        		$scope.openSettings = function(widget) {
        			$modal.open({
        				scope: $scope,
        				templateUrl: '../html/template/widget_settings.html',
        				controller: 'WidgetSettingsCtrl',
        				resolve: {
        					widget: function() {
        						return widget;
        					}
        				}
        			});
        		};
        ******************************************************************************************
        */
	}
])
/*
.controller('WidgetSettingsCtrl', ['$scope', '$timeout', '$rootScope', '$modalInstance', 'widget', '$compile',
	function ($scope, $timeout, $rootScope, $modalInstance, widget) {
        $scope.widget = widget;

        $scope.form = {
            name: widget.name,
            sizeX: widget.sizeX,
            sizeY: widget.sizeY,
            col: widget.col,
            row: widget.row,
            content: widget.content,
        };

        $scope.$watch('form.content', function (newValue, oldValue) {
            if (typeof (newValue) !== 'undefined') {
                $scope.typeList = $scope.graphContentList[newValue];
                $scope.dispTypelist = true;
            } else
                $scope.dispTypelist = false;
        });

        $scope.sizeOptions = [{
            id: '1',
            name: '1'
		}, {
            id: '2',
            name: '2'
		}, {
            id: '3',
            name: '3'
		}, {
            id: '4',
            name: '4'
		}];

        $scope.dismiss = function () {
            $modalInstance.dismiss();
        };

        $scope.remove = function () {
            $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
            $modalInstance.close();
        };

        $scope.submit = function () {
            angular.extend(widget, $scope.form);
            $modalInstance.close(widget);
        };
	}
])


// helper code
.filter('object2Array', function () {
    return function (input) {
        var out = [];
        for (i in input) {
            out.push(input[i]);
        }
        return out;
    }
});
*/