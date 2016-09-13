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
				modal: '=',
				question: '='
			}
		};
	}

	SubQuestionController.$inject = ['$scope', 'blockService', 'questionService'];

	function SubQuestionController($scope, blockService, questionService) {
		
	}

})();
