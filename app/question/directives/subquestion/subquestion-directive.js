(function () {
	'use strict';

	angular
		.module('app.library')
		.directive('subquestion', subquestion);

	function subquestion() {
		return {
			templateUrl: 'question/directives/subquestion/subquestion-template.html',
			restrict: 'E',
			controller: SubquestionController,
			controllerAs: 'vm',
			bindToController: true,
			scope: {
				question: '=',
				subquestion: '='
			}
		};
	}

	SubquestionController.$inject = ['$scope', 'subquestionService', 'answerService'];

	function SubquestionController($scope, subquestionService, answerService) {
		var vm = this;

		vm.subquestionTypes = [{
			value: 'Trắc nghiệm',
			text: 'Trắc nghiệm'
		}, {
			value: 'Điền từ',
			text: 'Điền từ'
		}, {
			value: 'Sắp xếp từ',
			text: 'Sắp xếp từ'
		}];

		vm.updateSubquestionType = updateSubquestionType;
		vm.removeSubquestion = removeSubquestion;

		var subquestionId = vm.subquestion.$id;
		vm.answers = answerService.getAnswersOfSubquestion(subquestionId);

		////////////////////

		$scope.openDialogBox = function (type) {
			var block = {
				isShowDialog: true,
				subquestion: vm.subquestion,
				blockType: type
			}
			$scope.$emit("show-content-dialog-box", block);
		}

		$scope.editSubquestionBlock = function (block) {
			console.log('hello');
			$scope.$emit("edit-block-content-dialog-box", block);
		}

		function removeSubquestion() {
			subquestionService.remove(vm.subquestion);
		}

		function updateSubquestionType(type) {
			var updateInfo = {
				type: type
			};
			subquestionService.update(vm.subquestion.$id, updateInfo);
		}
	}

})();
