(function () {
	'use strict';

	angular
		.module('app.core')
		.factory('firebaseDataService', firebaseDataService);

	function firebaseDataService() {
		var root = firebase.database().ref();

		var service = {
			root: root,
			questions: root.child('questions'),
			blocks: root.child('blocks'),
			subquestions: root.child('subquestions'),
			answers: root.child('answers')
		};

		return service;
	}

})();
