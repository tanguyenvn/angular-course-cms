(function () {
	'use strict';

	angular
		.module('app.core')
		.factory('subquestionService', subquestionService);

	subquestionService.$inject = ['$firebaseObject', '$firebaseArray', 'firebaseDataService'];

	function subquestionService($firebaseObject, $firebaseArray, firebaseDataService) {
		var service = {
			Subquestion: Subquestion,
			getById: getById,
			getSubquestionsOfQuestion: getSubquestionsOfQuestion,
			create: create,
			update: update,
			remove: remove,
			createContent: createContent,
			createSolution: createSolution
		};
		return service;

		// Subquestion constructor
		function Subquestion(questionId) {
			this.questionId = questionId;
			this.name = "";
			this.type = "Điền từ";
			this.contents = {};
			this.answers = {};
			this.solutions = {};
		}

		function getById(subquestionId) {
			return $firebaseObject(firebaseDataService.subquestions.child(subquestionId));
		}

		// TODO - handle realtime change
		function getSubquestionsOfQuestion(questionId) {
			var subquestionsRef = firebaseDataService.questions.child(questionId).child('subquestions');
			var subquestions = [];

			subquestionsRef.on('child_added', function (snapshot) {
				var subquestionId = snapshot.key;
				var subquestion = $firebaseObject(firebaseDataService.subquestions.child(subquestionId));
				subquestions.push(subquestion);
			});

			subquestionsRef.on('child_removed', function (snapshot) {
				var index = findIndex(subquestions, snapshot.key);
				if (index > -1) {
					subquestions.splice(index, 1);
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

			return subquestions;
		}

		function createContent(subquestionId, block) {
			var savingBlock = {
				contents: block.contents,
				type: 1
			};
			firebaseDataService.subquestions.child(subquestionId).child('contents').push(savingBlock);
		}

		function createSolution(subquestionId, block) {
			var savingBlock = {
				contents: block.contents,
				type: 1
			};
			firebaseDataService.subquestions.child(subquestionId).child('solutions').push(savingBlock);
		}

		function create(subquestion) {
			var subquestionId = firebaseDataService.subquestions.push(subquestion).key;
			firebaseDataService.questions.child(subquestion.questionId).child('subquestions').child(subquestionId).set(true);
		}

		function update(subquestionId, updateInfo) {
			firebaseDataService.subquestions.child(subquestionId).update(updateInfo);
		}

		function remove(subquestion) {
			firebaseDataService.subquestions.child(subquestion.$id).remove();
			firebaseDataService.questions.child(subquestion.questionId).child('subquestions').child(subquestion.$id).remove();
		}
	}

})();
