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
				question: '='
			}
		};
	}

	SubQuestionController.$inject = ['$scope'];

	function SubQuestionController($scope, blockService) {
		$scope.openDialogBox = function(type){
			var block = {
				isShowDialog: true,
				subQuestion: true,
				blockType: type
			}
			$scope.$emit("show-content-dialog-box", block);
		}
	}

})();
