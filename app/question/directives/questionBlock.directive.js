(function () {
	'use strict';

	angular
		.module('app.library')
		.directive('questionForm', questionForm);

	function questionForm() {
		return {
			templateUrl: 'library/directives/questionForm.html',
			restrict: 'E',
			controller: QuestionFormController,
			controllerAs: 'vm',
			bindToController: true,
			scope: {
				questions: '='
			}
		};
	}

	QuestionFormController.$inject = ['questionService'];

	function QuestionFormController(questionService) {
		var vm = this;

		vm.newParty = new questionService.Question();
		vm.addQuestion = addQuestion;

		function addQuestion() {
			//call $add to save to DB
			vm.questions.$add(vm.newQuestion);
			//reset value of form
			vm.newQuestion = new questionService.Question();
		}
	}

})();
