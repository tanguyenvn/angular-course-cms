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
			}
		};
	}

	SubQuestionController.$inject = ['$scope'];

	function SubQuestionController($scope) {
		$scope.openDialogBox = function(){
			$scope.$emit("show-content-dialog-box", true);
		}
	}

})();
