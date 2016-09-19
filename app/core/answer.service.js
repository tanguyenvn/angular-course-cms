(function () {
	'use strict';

	angular
		.module('app.core')
		.factory('answerService', answerService);

	answerService.$inject = ['$firebaseObject', '$firebaseArray', 'firebaseDataService'];

	function answerService($firebaseObject, $firebaseArray, firebaseDataService) {
		var service = {
			Answer: Answer,
			createAnswer: createAnswer,
			remove: remove,
			getById: getById,
			getAnswersOfSubquestion: getAnswersOfSubquestion,
			updateContentBlock: updateContentBlock
		};
		return service;

		// Subquestion constructor
		function Answer(subquestionId) {
			this.subquestionId = subquestionId;
			this.helptext = '';
			this.type = '';
			this.status = ';'
			this.contents = {};
		}

		function getById(answerId) {
			return $firebaseObject(firebaseDataService.answers.child(answerId));
		}

		// TODO - handle realtime change
		function getAnswersOfSubquestion(subquestionId) {
			var answersRef = firebaseDataService.subquestions.child(subquestionId).child('answers');
			var answers = [];

			answersRef.on('child_added', function (snapshot) {
				var answerId = snapshot.key;
				var answer = $firebaseObject(firebaseDataService.answers.child(answerId));
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
			var answer = new Answer(subquestionId);
			var answerId = firebaseDataService.answers.push(answer).key;
			var savingBlock = {
				contents: block.contents,
				type: 1
			};
			firebaseDataService.answers.child(answerId).child('contents').push(savingBlock);
			firebaseDataService.subquestions.child(answer.subquestionId).child('answers').child(answerId).set(true);
			return answerId;
		}

		function remove(answer) {
			firebaseDataService.answers.child(answer.$id).remove();
			firebaseDataService.subquestions.child(answer.subquestionId).child('answers').child(answer.$id).remove();
		}

		function updateContentBlock(answerId, block) {
			var updateInfo = {
				contents: block.contents,
				type: block.type
			}
			firebaseDataService.answers.child(answerId).child('contents').child(block.$id).update(updateInfo);
		}
	}

})();
