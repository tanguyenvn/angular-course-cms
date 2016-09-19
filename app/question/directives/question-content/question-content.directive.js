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
		////////////

		function editQuestionBlock($id, block) {
			block.question = vm.question.$id;
			block.$id = $id;
			$scope.$emit("subquestion-edit-block-dialog-box", block);
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
