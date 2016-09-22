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

	SubquestionController.$inject = ['$scope', '$q', '$timeout', '$filter', 'subquestionService', 'answerService', 'SUBQUESTION_TYPE'];

	function SubquestionController($scope, $q, $timeout, $filter, subquestionService, answerService, SUBQUESTION_TYPE) {
		var vm = this;
		vm.subquestionTypes = [{
			value: SUBQUESTION_TYPE.SINGLE_CHOICE,
			text: SUBQUESTION_TYPE.SINGLE_CHOICE
		}, {
			value: SUBQUESTION_TYPE.FILL_TEXT,
			text: SUBQUESTION_TYPE.FILL_TEXT
		}, {
			value: SUBQUESTION_TYPE.ANIMATION_1,
			text: SUBQUESTION_TYPE.ANIMATION_1
		}, {
			value: SUBQUESTION_TYPE.ANIMATION_2,
			text: SUBQUESTION_TYPE.ANIMATION_2
		}];

		vm.updateSubquestionType = updateSubquestionType;
		vm.removeSubquestion = removeSubquestion;

		var subquestionId = vm.subquestion.$id;
		vm.answers = answerService.getAnswersOfSubquestion(subquestionId);

		$scope.removeContent = removeContent;
		$scope.removeAnswer = removeAnswer;
		$scope.removeSolution = removeSolution;

		/////////////

		function removeContent(blockId) {
			subquestionService.removeContent(subquestionId, blockId);
		}

		function removeSolution(blockId) {
			subquestionService.removeSolution(subquestionId, blockId);
		}

		function removeAnswer(answer) {
			answerService.removeAnswer(subquestionId, answer.$id);
		}

		$scope.displayCheckMethod = function () {
			return vm.subquestion.type !== SUBQUESTION_TYPE.SINGLE_CHOICE;
		}

		$scope.isSingleChoiceType = function () {
			return vm.subquestion.type === SUBQUESTION_TYPE.SINGLE_CHOICE;
		}

		$scope.isFillTextType = function () {
			return vm.subquestion.type === SUBQUESTION_TYPE.FILL_TEXT;
		}

		$scope.isAnimationType = function () {
			return vm.subquestion.type === SUBQUESTION_TYPE.ANIMATION_1 || vm.subquestion.type === SUBQUESTION_TYPE.ANIMATION_2;
		}

		$scope.isTextOrMathValueCheckMethod = function () {
			return vm.subquestion.checkMethod === 'text' || vm.subquestion.checkMethod === 'math';
		}

		$scope.isCorrectSingleChoiceAnswer = function (answer) {
			return answer.isTrue && vm.subquestion.type === SUBQUESTION_TYPE.SINGLE_CHOICE;
		}

		$scope.hasImage = function (block) {
			return !jQuery.isEmptyObject(block.images);
		}

		$scope.hasAudio = function (block) {
			return !jQuery.isEmptyObject(block.audios);
		}

		$scope.hasVideo = function (block) {
			return !jQuery.isEmptyObject(block.videos);
		}

		/*Manage content dialog*/

		/*Manage answer dialog*/
		$scope.openAnswerDialogBox = function (answer) {
				if (answer) {
					var data = {
						block: answer,
						subquestion: vm.subquestion
					}
					$scope.$emit("subquestion-show-answer-dialog-box", data);
				} else {
					$scope.$emit("subquestion-show-answer-dialog-box", vm.subquestion);
				}
			}
			/*Manage solution dialog*/
		$scope.openSolutionDialogBox = function (block, blockId) {
			if (block) {
				block.$id = blockId;
				var data = {
					block: block,
					subquestion: vm.subquestion
				}
				$scope.$emit("subquestion-show-solution-dialog-box", data);
			} else {
				$scope.$emit("subquestion-show-solution-dialog-box", vm.subquestion);
			}
		}

		$scope.updateCheckMethod = function () {
			var updateInfo = {
				checkMethod: vm.subquestion.checkMethod
			};
			subquestionService.update(vm.subquestion.$id, updateInfo);
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

		$scope.updateSubquestionPosition = function () {
			var updateInfo = {
				positions: vm.subquestion.positions
			};
			//subquestionService.update(vm.subquestion.$id, updateInfo);
		}

		$scope.matchAnswerValue = function (query) {
			var deferred = $q.defer();
			/*console.log(answerValues);*/
			var answerValues = [];
			vm.answers.forEach(function (answer) {
				answerValues.push({
					value: answer.value
				});
			});
			deferred.resolve($filter('filter')(vm.answers, query));
			return deferred.promise;
		}

		$scope.addTag = function ($tag) {
			$timeout(updateTag);
		}

		$scope.removeTag = function () {
			$timeout(updateTag);
		}

		function updateTag() {
			var updateInfo = {
				positions: vm.subquestion.positions
			};
			subquestionService.update(vm.subquestion.$id, updateInfo);
		}

	}

})();
