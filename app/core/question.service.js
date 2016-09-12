(function () {
	'use strict';

	angular
		.module('app.core')
		.factory('questionService', questionService);

	questionService.$inject = ['$firebaseObject', '$firebaseArray', 'firebaseDataService'];

	function questionService($firebaseObject, $firebaseArray, firebaseDataService) {
		var service = {
			getById: getById,
			getAll: getAll,
			Question: Question
		};
		return service;

		//Question constructor
		function Question() {
			this.name = "";
			this.status = "";
		}

		function getById(questionId) {
			return $firebaseObject(firebaseDataService.questions.child(questionId));
		}

		function getAll() {
			var questions = $firebaseArray(firebaseDataService.questions);
			return questions;
		}
	}

})();
