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
				modal: '=',
				question: '='
			}
		};
	}

	SubquestionListController.$inject = ['$scope', 'subquestionService'];

	function SubquestionListController($scope, subquestionService, $element) {
		var vm = this;
		var questionId = vm.question.$id;
		$scope.subquestions = subquestionService.getSubquestionsOfQuestion(questionId);
		$scope.addSubQuestion = function (event) {
			console.log("controller - add subquestion");
			var newSubquestion = new subquestionService.Subquestion(questionId);
			subquestionService.save(newSubquestion);
		}
	}

})();
