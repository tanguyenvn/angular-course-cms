(function () {
	'use strict';

	angular
		.module('app.core')
		.factory('answerService', answerService);

	answerService.$inject = ['$firebaseObject', '$firebaseArray', 'firebaseDataService'];

	function answerService($firebaseObject, $firebaseArray, firebaseDataService) {
		var service = {
			Answer: Answer,
			save: save,
			remove: remove,
			getById: getById,
			getAnswersOfSubquestion: getAnswersOfSubquestion
		};
		return service;

		// Subquestion constructor
		function Answer(subquestionId) {
			this.subquestionId = subquestionId;
			this.helptext = '';
			this.type = '';
			this.status = ';'
			this.contents = [];
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

			answersRef.on('child_changed', function (snapshot) {
				var index = findIndex(answers, snapshot.key);
				if (index > -1) {
					console.log("answer update");
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

		function save(answer) {
			console.log("service - save answer");
			var answerId = firebaseDataService.answers.push(answer).key;
			firebaseDataService.subquestions.child(answer.subquestionId).child('answers').child(answerId).set(true);
		}

		function remove(answer) {
			console.log("service - remove answer");
			firebaseDataService.answers.child(answer.$id).remove();
			firebaseDataService.subquestions.child(answer.subquestionId).child('answers').child(answer.$id).remove();
		}
	}

})();
