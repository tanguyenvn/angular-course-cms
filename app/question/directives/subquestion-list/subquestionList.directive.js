(function () {
	'use strict';

	angular
		.module('app.library')
		.directive('subquestionList', subquestionList);

	function subquestionList() {
		return {
			templateUrl: 'question/directives/subquestion-list/subquestionList.template.html',
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

	SubquestionListController.$inject = ['$scope', 'blockService'];

	function SubquestionListController($scope, blockService, $element) {
		var vm = this;
		$scope.subQuestions = [];
		vm.questionContentBlocks = blockService.getBlocksOfQuestion(vm.question.$id);
		vm.open = function open() {
			console.log('open ' + vm.modal);
			vm.modal = true;
		}
		$scope.addSubQuestion = function(event){
			console.log("add", event)
			$scope.subQuestions.push({});
			var width = $(".sub-questions").width() +280;
			console.log(width);
		}
	}

})();
