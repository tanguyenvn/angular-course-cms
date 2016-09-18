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

	SubquestionListController.$inject = ['subquestionService', '$scope'];

	function SubquestionListController(subquestionService, $scope) {
		var vm = this;
		vm.subquestions = subquestionService.getSubquestionsOfQuestion(vm.question.$id);
		vm.createSubquestion = createSubquestion;

		function createSubquestion() {
			var subquestion = new subquestionService.Subquestion(vm.question.$id);
			subquestionService.create(subquestion);
		}

		$scope.onDropComplete = function (index, obj, evt) {
            var otherObj = vm.subquestions[index];
            var otherIndex = vm.subquestions.indexOf(obj);
            vm.subquestions[index] = obj;
            vm.subquestions[otherIndex] = otherObj;
        }
	}

})();
