angular.module('App').controller('SocialNetworkController', socialNetworkFnt);

socialNetworkFnt.$inject = ['$scope', '$log'];

function socialNetworkFnt($scope, $log) {
    $scope.facebookRoot = "https://www.facebook.com/";
    $scope.twitterRoot = "https://twitter.com/";

    $scope.facebookFeed = "Pokemon";
    $scope.twitterFeed = "Pokemon";

    $scope.facebookLink;
    $scope.twitterLink;

    $scope.generateFacebookLink = function() {
        $scope.facebookLink = $scope.facebookRoot + $scope.facebookFeed;
    }
    $scope.generateFacebookLink();

    $scope.generateTwitterLink = function() {
        $scope.twitterLink = $scope.twitterRoot + $scope.twitterFeed;
    }
    $scope.generateTwitterLink();

    $scope.facebookLinker = function(){
	    (function(d, s, id) {
	        var js, fjs = d.getElementsByTagName(s)[0];
	        if (d.getElementById(id)) return;
	        js = d.createElement(s);
	        js.id = id;
	        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
	        fjs.parentNode.insertBefore(js, fjs);
	    }(document, 'script', 'facebook-jssdk'));
	}
	$scope.facebookLinker();

	$scope.twitterLinker = function(){
	    (function(w, d, s) {
	        function go() {
	            var js, fjs = d.getElementsByTagName(s)[0],
	                load = function(url, id) {
	                    if (d.getElementById(id)) {
	                        return;
	                    }
	                    js = d.createElement(s);
	                    js.src = url;
	                    js.id = id;
	                    fjs.parentNode.insertBefore(js, fjs);
	                };
	            load('https://apis.google.com/js/plusone.js', 'gplus1js');
	            load('//platform.twitter.com/widgets.js', 'tweetjs');
	        }
	        if (w.addEventListener) {
	            w.addEventListener("load", go, false);
	        } else if (w.attachEvent) {
	            w.attachEvent("onload", go);
	        }
	    }(window, document, 'script'));

	    (function(d, s, id) {
	        var js, fjs = d.getElementsByTagName(s)[0];
	        if (d.getElementById(id)) return;
	        js = d.createElement(s);
	        js.id = id;
	        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
	        fjs.parentNode.insertBefore(js, fjs);
	    }(document, 'script', 'facebook-jssdk'));
	}
	$scope.twitterLinker();
}