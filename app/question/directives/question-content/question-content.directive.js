(function () {
	'use strict';

	angular
		.module('app.library')
		.directive('questionContent', questionContent);

	function questionContent() {
		return {
			templateUrl: 'question/directives/question-content/question-content.template.html',
			restrict: 'E',
			controller: QuestionContentController,
			controllerAs: 'vm',
			bindToController: true,
			scope: {
				question: '='
			}
		};
	}

	QuestionContentController.$inject = ['$scope', 'questionService'];

	function QuestionContentController($scope, questionService) {
		var vm = this;
		vm.updateQuestionName = updateQuestionName;
		vm.openDialogBox = openDialogBox;
		vm.editQuestionBlock = editQuestionBlock;
		vm.removeContent = removeContent;

		////////////

		$scope.hasImage = function (block) {
			return !jQuery.isEmptyObject(block.images);
		}

		$scope.hasAudio = function (block) {
			return !jQuery.isEmptyObject(block.audios);
		}

		$scope.hasVideo = function (block) {
			return !jQuery.isEmptyObject(block.videos);
		}

		function editQuestionBlock($id, block) {
			block.questionId = vm.question.$id;
			block.$id = $id;
			$scope.$emit("question-edit-block-dialog-box", block);
		}

		function removeContent(blockId) {
			var questionId = vm.question.$id;
			questionService.removeContent(questionId, blockId);
		}

		function openDialogBox() {
			$scope.$emit("question-show-content-dialog-box", vm.question.$id);
		}

		function updateQuestionName(questionName) {
			questionService.update(vm.question.$id, {
				name: questionName
			});
		}
	}

})();
