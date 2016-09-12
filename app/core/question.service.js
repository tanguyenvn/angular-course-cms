(function () {
	'use strict';

	angular
		.module('app.core')
		.factory('questionService', questionService);

	questionService.$inject = ['$firebaseArray', 'firebaseDataService'];

	function questionService($firebaseArray, firebaseDataService) {
		var service = {
			/*getById: getById,*/
			getAll: getAll
		};
		return service;
		function getAll() {
			console.log('getAll called');
			var questions = $firebaseArray(firebaseDataService.questions);
			return questions;
		}
	}

})();
