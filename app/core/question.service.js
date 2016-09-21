(function () {
	'use strict';

	angular
		.module('app.core')
		.factory('questionService', questionService);

	questionService.$inject = ['$firebaseObject', '$firebaseArray', 'firebaseDataService', 'blockService', 'fileService'];

	function questionService($firebaseObject, $firebaseArray, firebaseDataService, blockService, fileService) {
		var service = {
			Question: Question,
			getById: getById,
			getAll: getAll,
			update: update,
			createContent: createContent,
			updateContent: updateContent
		};
		return service;

		//Question constructor
		function Question() {
			this.name = "";
			this.status = "";
			this.contents = {};
			this.subquestions = {};
		}

		function getById(questionId) {
			return $firebaseObject(firebaseDataService.questions.child(questionId));
		}

		function getAll() {
			return $firebaseArray(firebaseDataService.questions);
		}

		function update(questionId, updateInfo) {
			firebaseDataService.questions.child(questionId).update(updateInfo);
		}

		function createContent(questionId, block) {
			var contentsRef = getContentsRef(questionId);
			blockService.createBlock(contentsRef, block);
		}

		function updateContent(questionId, block) {
			var contentsRef = getContentsRef(questionId);
			blockService.updateBlock(contentsRef, block);
		}

		function getContentsRef(questionId) {
			return firebaseDataService.questions.child(questionId).child('contents');
		}
	}

})();
