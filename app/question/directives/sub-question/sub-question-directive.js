(function () {
	'use strict';

	angular
		.module('app.library')
		.directive('subQuestion', subQuestion);

	function subQuestion() {
		return {
			templateUrl: 'question/directives/sub-question/sub-question-template.html',
			restrict: 'E',
			controller: SubQuestionController,
			controllerAs: 'vm',
			bindToController: true,
			scope: {
				question: '=',
				subquestion: '='
			}
		};
	}

	SubQuestionController.$inject = ['$scope', 'subquestionService', 'blockService'];

	function SubQuestionController($scope, subquestionService, blockService) {
		var vm = this;
		$scope.subQuestonBlocks = blockService.getBlocksOfSubQuestion(vm.subquestion.$id);
		$scope.solutionBlocks = blockService.getBlocksSolutionOfSubQuestion(vm.subquestion.$id);
		$scope.openDialogBox = function (type) {
			console.log(vm.subquestion)
			var block = {
				isShowDialog: true,
				subQuestion: vm.subquestion,
				blockType: type
			}
			$scope.$emit("show-content-dialog-box", block);
		}
		$scope.editQuestionBlock = function(block){
			$scope.$emit("edit-block-content-dialog-box", block);
		}
		vm.removeSubquestion = function removeQuestion() {
			console.log("SubQuestionController - remove");
			subquestionService.remove(vm.subquestion);
		}
	}

})();
