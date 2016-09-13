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
			getBlocksOfQuestion: getBlocksOfQuestion
		};
		return service;

		function save(block) {
			//save block
			var blockId = firebaseDataService.blocks.push(block).key;
			//save blockId to questions.questionItem.contents
			firebaseDataService.questions.child(block.question).child('contents').child(blockId).set(true);
		}

		function getById(blockId) {
			return $firebaseObject(firebaseDataService.blocks.child(blockId));
		}

		function getBlocksOfQuestion(questionId) {
			var questionRef = firebaseDataService.questions.child(questionId).child('contents');
			var blocks = [];
			questionRef.on('child_added', function (content) {
				var blockId = content.key;
				blocks.push($firebaseObject(firebaseDataService.blocks.child(blockId)));
			});
			return blocks;
		}

		function getAll() {
			return $firebaseArray(firebaseDataService.blocks);
		}
	}

})();
