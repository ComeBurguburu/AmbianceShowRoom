angular.module('commServices', []).factory('comm', commFnc);
commFnc.$inject = ['$http', '$q', 'factory'];

function commFnc($http, $q, factory) {
	var comm = {
		loadImages: loadImages,
		loadPres: loadPres,
		savePres: savePres

	};

	function loadImages(presName, presID) {
		var deferred = $q.defer();
		$http.get('/resources_list').
		success(function (data, status, headers, config) {
			deferred.resolve(data);
		}).
		error(function (data, status, headers, config) {
			deferred.reject(status);
			// or server returns response with an error status.
		});
		return deferred.promise;
	};

	function loadPres(presName, presID) {
		var deferred = $q.defer();
		$http.get('/loadPres').
		success(function (data, status, headers, config) {
			deferred.resolve(data);
		}).
		error(function (data, status, headers, config) {
			deferred.reject(status);
			// or server returns response with an error status.
		});
		return deferred.promise;
	}
	/*
	function loadImages(presName,presID){ 
		var contentMap = {};
		var deferred = $q.defer();
		for (var i=0; i<=13; i++) {
			var title = "Star-Wars"+i;
			var type = "IMG_URL";
			var src = "img/"+i+".jpg";
			var content={};
	        content.id=i;
	        content.title=title;
	        content.src=src;
	        content.type=type;
			contentMap[i] = content;
		}
		
		
		var interval = setInterval(function(contentMap,deferred){
		
			deferred.resolve(contentMap);
			clearInterval(interval);

		},3000,contentMap,deferred);

		return deferred.promise;
	};
	function loadPres(presName,presID){
		 var deferred = $q.defer();
			var description = "Présentation des personnages de star wars";
			var title = "Personnages Star Wars";

		slid1= factory.slidCreation("Luke","je m'apelle Luke");
		 // slid2= factory.slidCreation("clone-orange","je suis un clone-orange");
		 // slid3= factory.slidCreation("clone-bleu","je suis un clone-bleu");

		 var presentationMap=[];
		presentationMap[0]=factory.presentationCreation(title,description);

		presentationMap[0].slidArray.push(slid1);

		
		var interval = setInterval(function(presentationMap,deferred){

		deferred.resolve(presentationMap);

		clearInterval(interval);
		},3000,presentationMap,deferred);

			
		
		// deferred.reject("NULL");
		return deferred.promise;
	};*/
	function savePres(currentPresentation) {
 		
		var deferred = $q.defer();

		$http.post('/savePres', JSON.stringify(currentPresentation)).
		success(function (data, status, headers, config) {
			deferred.resolve(data);
		}).
		error(function (data, status, headers, config) {
			console.error(JSON.stringify(data));
			deferred.reject(status);
			// or server returns response with an error status.
		});
		return deferred.promise;
};
return comm;

};