(function () {
	'use strict';

	angular
		.module('app.core')
		.factory('subquestionService', subquestionService);

	subquestionService.$inject = ['$firebaseObject', '$firebaseArray', 'firebaseDataService', 'blockService'];

	function subquestionService($firebaseObject, $firebaseArray, firebaseDataService, blockService) {
		var service = {
			Subquestion: Subquestion,
			getById: getById,
			getSubquestionsOfQuestion: getSubquestionsOfQuestion,
			create: create,
			update: update,
			remove: remove,
			createContent: createContent,
			createSolution: createSolution,
			updateContent: updateContent,
			updateSolution: updateSolution,
			createAnswerRef: createAnswerRef,
			removeAnswerRef: removeAnswerRef,
			getAnswersRef: getAnswersRef
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

		function createContent(subquestionId, block) {
			var contentsRef = getContentsRef(subquestionId);
			blockService.createBlock(contentsRef, block);
		}

		function createSolution(subquestionId, block) {
			var solutionsRef = getSolutionsRef(subquestionId);
			blockService.createBlock(solutionsRef, block);
		}

		function updateContent(subquestionId, block) {
			var contentsRef = getContentsRef(subquestionId);
			blockService.updateBlock(contentsRef, block);
		}

		function updateSolution(subquestionId, block) {
			var solutionsRef = getSolutionsRef(subquestionId);
			blockService.updateBlock(solutionsRef, block);
		}

		function createAnswerRef(subquestionId, answerId) {
			var answersRef = firebaseDataService.subquestions.child(subquestionId).child('answers');
			answersRef.child(answerId).set(true);
		}

		function removeAnswerRef(subquestionId, answerId) {
			var answersRef = firebaseDataService.subquestions.child(subquestionId).child('answers');
			answersRef.child(answerId).remove();
		}

		function getContentsRef(subquestionId) {
			return firebaseDataService.subquestions.child(subquestionId).child('contents');
		}

		function getSolutionsRef(subquestionId) {
			return firebaseDataService.subquestions.child(subquestionId).child('solutions');
		}

		function getAnswersRef(subquestionId) {
			return firebaseDataService.subquestions.child(subquestionId).child('answers');
		}

	}

})();
