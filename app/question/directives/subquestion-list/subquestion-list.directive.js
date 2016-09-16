(function () {
	'use strict';

	angular
		.module('app.library')
		.directive('subquestionList', subquestionList);

	function subquestionList() {
		return {
			templateUrl: 'question/directives/subquestion-list/subquestion-list.template.html',
			restrict: 'E',
			controller: SubquestionListController,
			controllerAs: 'vm',
			bindToController: true,
			scope: {
				question: '='
			}
		};
	}

	SubquestionListController.$inject = ['subquestionService'];

	function SubquestionListController(subquestionService) {
		var vm = this;
		vm.subquestions = subquestionService.getSubquestionsOfQuestion(vm.question.$id);
		vm.createSubquestion = createSubquestion;

		function createSubquestion() {
			var subquestion = new subquestionService.Subquestion(vm.question.$id);
			subquestionService.create(subquestion);
		}
	}

})();
