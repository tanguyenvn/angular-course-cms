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
			$scope.$emit("edit-block-content-dialog-box", block);
		}

		function openDialogBox() {
			var block = {
				isShowDialog: true,
				question: vm.question.$id
			}
			$scope.$emit("show-content-dialog-box", block);
		}

		function updateQuestionName(questionName) {
			questionService.update(vm.question.$id, {
				name: questionName
			});
		}
	}

})();
