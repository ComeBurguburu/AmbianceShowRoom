/*
	Github
*/

angular.module('App').controller('RootCtrl', function ($scope) {
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
    $scope.$on('$locationChangeStart', function (e, next, current) {
        $scope.page = next.split('/').splice(-1);
    });
});