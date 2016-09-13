(function () {
	'use strict';

	angular
		.module('app.library')
		.directive('questionContent', questionContent);

	function questionContent() {
		return {
			templateUrl: 'question/directives/question-content/questionContent.template.html',
			restrict: 'E',
			controller: QuestionContentController,
			controllerAs: 'vm',
			bindToController: true,
			scope: {
				modal: '=',
				question: '='
			}
		};
	}

	QuestionContentController.$inject = ['$scope', 'blockService'];

	function QuestionContentController($scope, blockService) {
		var vm = this;
		$scope.questionContentBlocks = blockService.getBlocksOfQuestion(vm.question.$id);
		$scope.openDialogBox = function() {
			$scope.$emit("show-content-dialog-box", true);
		}
	}

})();
