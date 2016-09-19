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
				type: block.type
			}
			var blockId = firebaseDataService.questions.child(questionId).child('contents').push(savingBlock).key;
			var blockContentsRef = firebaseDataService.questions.child(questionId).child('contents').child(blockId).child('contents');
			//save each content of block
			block.contents.forEach(function (content) {
				blockContentsRef.push({
					text: content.text
				});
			});
		}

		function updateBlock(questionId, block) {
			var updateTypeInfo = {
				type: block.type
			}
			var blockRef = firebaseDataService.questions.child(questionId).child('contents').child(block.$id);
			blockRef.update(updateTypeInfo);
			block.contents.forEach(function (content) {
				//update if existed
				if (content.$id) {
					blockRef.child('contents').child(content.$id).update({
						text: content.text
					});
				} else {
					blockRef.child('contents').push({
						text: content.text
					});
				}
			});
		}
	}

})();
