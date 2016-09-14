(function () {
	'use strict';

	angular
		.module('app.core')
		.factory('blockService', blockService);

	blockService.$inject = ['$firebaseObject', '$firebaseArray', 'firebaseDataService'];

	function blockService($firebaseObject, $firebaseArray, firebaseDataService) {
		var service = {
			getById: getById,
			getAll: getAll,
			save: save,
			editBlock: editBlock,
			getBlocksOfQuestion: getBlocksOfQuestion,
			getBlocksOfSubQuestion: getBlocksOfSubQuestion,
			getBlocksSolutionOfSubQuestion: getBlocksSolutionOfSubQuestion,
			getBlocksAnswerOfSubQuestion: getBlocksAnswerOfSubQuestion
		};
		return service;

		function save(block) {
			//save block
			if (block.question) {
				var blockId = firebaseDataService.blocks.push(block).key;
				firebaseDataService.questions.child(block.question).child('contents').child(blockId).set(true);
			} else if (block.subQuestion || block.answer) {
				if (block.blockType == 'content') {
					delete block.blockType;
					var blockId = firebaseDataService.blocks.push(block).key;
					firebaseDataService.subquestions.child(block.subQuestion).child('contents').child(blockId).set(true);
				} else if (block.blockType == 'answer') {
					delete block.blockType;
					var blockId = firebaseDataService.blocks.push(block).key;
					firebaseDataService.answers.child(block.answer).child('contents').child(blockId).set(true);
				} else if (block.blockType == 'solution') {
					delete block.blockType;
					var blockId = firebaseDataService.blocks.push(block).key;
					firebaseDataService.subquestions.child(block.subQuestion).child('solutions').child(blockId).set(true);
				}

			}

			//save blockId to questions.questionItem.contents

		}

		function editBlock(block) {
			firebaseDataService.blocks.child(block.$id).update({
				contents: block.contents
			});
		}

		function getById(blockId) {
			return $firebaseObject(firebaseDataService.blocks.child(blockId));
		}

		//TODO - handle realtime change
		function getBlocksOfQuestion(questionId) {
			var questionRef = firebaseDataService.questions.child(questionId).child('contents');
			var blocks = [];
			questionRef.on('child_added', function (content) {
				var blockId = content.key;
				blocks.push($firebaseObject(firebaseDataService.blocks.child(blockId)));
			});

			return blocks;
		}

		//TODO - handle realtime change
		function getBlocksOfSubQuestion(subQuestionId) {
			var questionRef = firebaseDataService.subquestions.child(subQuestionId).child('contents');
			var blocks = [];
			questionRef.on('child_added', function (content) {
				var blockId = content.key;
				blocks.push($firebaseObject(firebaseDataService.blocks.child(blockId)));
			});

			return blocks;
		}

		//TODO - handle realtime change
		function getBlocksSolutionOfSubQuestion(subQuestionId) {
			var questionRef = firebaseDataService.subquestions.child(subQuestionId).child('solutions');
			var blocks = [];
			questionRef.on('child_added', function (content) {
				var blockId = content.key;
				blocks.push($firebaseObject(firebaseDataService.blocks.child(blockId)));
			});

			return blocks;
		}

		//TODO - handle realtime change
		function getBlocksAnswerOfSubQuestion(subQuestionId) {
			var answersRef = firebaseDataService.subquestions.child(subQuestionId).child('answers');
			var blocks = [];
			answersRef.on('child_added', function (snapshot) {
				var answerId = snapshot.key;
				var blocksRef = firebaseDataService.answers.child(answerId).child('contents');
				blocksRef.on('child_added', function (block) {
					var blockId = block.key;
					blocks.push($firebaseObject(firebaseDataService.blocks.child(blockId)));
				});
			});
			return blocks;
		}

		function getAll() {
			return $firebaseArray(firebaseDataService.blocks);
		}
	}

})();
