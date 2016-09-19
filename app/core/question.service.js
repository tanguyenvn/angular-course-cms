(function () {
	'use strict';

	angular
		.module('app.core')
		.factory('questionService', questionService);

	questionService.$inject = ['$firebaseObject', '$firebaseArray', 'firebaseDataService'];

	function questionService($firebaseObject, $firebaseArray, firebaseDataService) {
		var service = {
			Question: Question,
			getById: getById,
			getAll: getAll,
			update: update,
			createBlock: createBlock,
			updateBlock: updateBlock
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

		function createBlock(questionId, block) {
			var savingBlock = {
				contents: block.contents,
				type: 1
			}
			firebaseDataService.questions.child(questionId).child('contents').push(savingBlock);
		}

		function updateBlock(questionId, block) {
			var updateInfo = {
				contents: block.contents,
				type: block.type
			}
			firebaseDataService.questions.child(questionId).child('contents').child(block.$id).update(updateInfo);
		}

	}

})();
