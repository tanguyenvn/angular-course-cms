(function () {
	'use strict';

	angular
		.module('app.core')
		.factory('firebaseStorageService', firebaseStorageService);

	function firebaseStorageService() {
		var root = firebase.storage().ref();

		var service = {
			root: root,
			images: root.child('images'),
			audios: root.child('audios')
		};

		return service;
	}

})();
