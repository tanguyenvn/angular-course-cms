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

	SubQuestionController.$inject = ['$scope', 'subquestionService'];

	function SubQuestionController($scope, subquestionService) {
		var vm = this;
		$scope.openDialogBox = function (type) {
			var block = {
				isShowDialog: true,
				subQuestion: true,
				blockType: type
			}
			$scope.$emit("show-content-dialog-box", block);
		}
		vm.removeSubquestion = function removeQuestion() {
			console.log("SubQuestionController - remove");
			subquestionService.remove(vm.subquestion);
		}
	}

})();
