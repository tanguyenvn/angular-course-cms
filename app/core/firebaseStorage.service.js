(function () {
	'use strict';

	angular
		.module('app.core')
		.factory('firebaseStorageService', firebaseStorageService);

	function firebaseStorageService() {
		var root = firebase.storage().ref();

		var service = {
			root: root,
			questionImages: root.child('question/images'),
		};

		return service;
	}

})();
