(function () {
	'use strict';

	angular
		.module('app.core')
		.factory('answerService', answerService);

	answerService.$inject = ['$firebaseObject', '$firebaseArray', 'firebaseDataService', 'subquestionService', 'blockService'];

	function answerService($firebaseObject, $firebaseArray, firebaseDataService, subquestionService, blockService) {
		var service = {
			Answer: Answer,
			createAnswer: createAnswer,
			updateAnswer: updateAnswer,
			removeAnswer: removeAnswer,
			getById: getById,
			getAnswersOfSubquestion: getAnswersOfSubquestion
		};
		return service;

		// Subquestion constructor
		function Answer(subquestionId, type) {
			this.subquestionId = subquestionId;
			this.helptext = '';
			this.type = type;
			this.status = ';'
			this.contents = {};
		}

		function getById(answerId) {
			var answerRef = getAnswerRef(answerId);
			return $firebaseObject(answerRef);
		}

		// TODO - handle realtime change
		function getAnswersOfSubquestion(subquestionId) {
			var answersRef = subquestionService.getAnswersRef(subquestionId);
			var answers = [];

			answersRef.on('child_added', function (snapshot) {
				var answerId = snapshot.key;
				var answerRef = getAnswerRef(answerId);
				var answer = $firebaseObject(answerRef);
				answers.push(answer);
			});

			answersRef.on('child_removed', function (snapshot) {
				var index = findIndex(answers, snapshot.key);
				if (index > -1) {
					answers.splice(index, 1);
				} else {
					console.log("problem, maybe bug");
				}
			});

			function findIndex(itemArray, key) {
				var index = -1;
				itemArray.forEach(function (item, id) {
					if (item.$id == key) {
						index = id;
					}
				});
				return index;
			}
			return answers;
		}

		function createAnswer(subquestionId, block) {
			var answersRef = getAnswersRef();
			var answerId = blockService.createBlock(answersRef, block);
			//create answer reference in subquestion
			subquestionService.createAnswerRef(subquestionId, answerId);
			return answerId;
		}

		function updateAnswer(answerId, block) {
			var answersRef = getAnswersRef()
			blockService.updateBlock(answersRef, block);
		}

		function removeAnswer(subquestionId, answerId) {
			var answerRef = getAnswerRef(answerId);
			answerRef.remove();
			//remove answer reference in subquestion
			subquestionService.removeAnswerRef(subquestionId, answerId);
		}

		function getAnswerRef(answerId) {
			return firebaseDataService.answers.child(answerId);
		}

		function getAnswersRef() {
			return firebaseDataService.answers;
		}
	}

})();
