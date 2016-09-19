(function () {
	'use strict';

	angular
		.module('app.library')
		.directive('contentBlock', contentBlock);

	function contentBlock() {
		return {
			templateUrl: 'question/directives/content-block/content-block.template.html',
			restrict: 'E',
			controller: ContentBlockController,
			controllerAs: 'vm',
			bindToController: true,
			scope: {
				question: '='
			}
		};
	}

	ContentBlockController.$inject = ['$scope', 'subquestionService', 'questionService', 'answerService', 'SUBQUESTION_TYPE'];

	function ContentBlockController($scope, subquestionService, questionService, answerService, SUBQUESTION_TYPE, BLOCK_TYPES) {
		var vm = this;
		var isSubquestion = false;
		var isEditQuestionBlock = false;
		var createContent, blockObject, blockType, editBlock;
		initData();
		$scope.isShowContentDialog = false;
		$scope.blockTypes = blockTypes();

		vm.save = save;
		vm.close = close;
		$scope.ckeditorOptions = configCkeditor();
		$scope.createTextContent = createTextContent;

		//question event
		$scope.$on("question-manage-show-content-dialog-box", function (event, data) {
			showDialogBox();
			isSubquestion = false;
			createContent = data;
		});
		$scope.$on("question-manage-edit-block-dialog-box", function (event, data) {
			$scope.block.contents = contentsToArray(data.contents);
			$scope.block.type = data.type;
			isEditQuestionBlock = true;
			blockObject = data;
			showDialogBox();
		});

		//subquestion event
		$scope.$on("subquestion-manage-show-content-dialog-box", function (event, data) {
			showDialogBox();
			isSubquestion = true;
			blockType = SUBQUESTION_TYPE.CONTENT;
			if (data.block) {
				editBlock = data.subquestion;
				blockObject = data.block;
				$scope.block.contents = contentsToArray(data.block.contents);
				$scope.block.type = data.block.type;
			} else {
				createContent = data;
			}
		});
		$scope.$on("subquestion-manage-show-answer-dialog-box", function (event, data) {
			showDialogBox();
			isSubquestion = true;
			blockType = SUBQUESTION_TYPE.ANSWER;
			if (data.block) {
				editBlock = data.answer;
				blockObject = data.block;
				$scope.block.contents = contentsToArray(data.block.contents);
				$scope.block.type = data.block.type;
			} else {
				createContent = data;
			}
		});
		$scope.$on("subquestion-manage-show-solution-dialog-box", function (event, data) {
			showDialogBox();
			isSubquestion = true;
			blockType = SUBQUESTION_TYPE.SOLUTION;
			if (data.block) {
				editBlock = data.subquestion;
				blockObject = data.block;
				$scope.block.contents = contentsToArray(data.block.contents);
				$scope.block.type = data.block.type;
			} else {
				createContent = data;
			}
		});

		function contentsToArray(obj) {
			var array = [];
			angular.forEach(obj, function (value, key) {
				value.$id = key;
				this.push(value);
			}, array);
			return array;
		}

		function configCkeditor() {
			//config ckeditor
			return {
				height: 100,
				removeButtons: '',
				toolbar: [{
					name: 'basicstyles',
					items: ['Bold', 'Italic', 'Underline']
				}, {
					name: 'insert',
					items: ['Image', 'Insertvariable']
				}],
				extraPlugins: 'insertvariable',
				allowedContent: true,
				autoParagraph: false,
				enterMode: CKEDITOR.ENTER_BR,
				contentsCss: ['bower_components/ckeditor/contents.css', 'content/ckeditor/ckeditor.css'],
				skin: 'moono,/content/ckeditor/skins/moono/' //to display button label
			};
		}

		function save() {
			if (isSubquestion) {
				//create subquestion content
				if (blockType === SUBQUESTION_TYPE.CONTENT) {
					if (editBlock) {
						blockObject.contents = $scope.block.contents;
						blockObject.type = $scope.block.type;
						subquestionService.updateContentBlock(editBlock.$id, blockObject);
					} else {
						createSubquestionContent(createContent);
					}
				}
				//create subquestion solution
				if (blockType === SUBQUESTION_TYPE.SOLUTION) {
					if (editBlock) {
						blockObject.contents = $scope.block.contents;
						blockObject.type = $scope.block.type;
						subquestionService.updateSolutionBlock(editBlock.$id, blockObject);
					} else {
						createSubquestionSolution(createContent);
					}
				}
				//create subquestion answer
				if (blockType === SUBQUESTION_TYPE.ANSWER) {
					if (editBlock) {
						blockObject.contents = $scope.block.contents;
						blockObject.type = $scope.block.type;
						answerService.updateContentBlock(editBlock.$id, blockObject);
					} else {
						createSubquestionAnswer(createContent);
					}
				}
			} else if (isEditQuestionBlock) {
				//edit question
				blockObject.contents = $scope.block.contents;
				blockObject.type = $scope.block.type;
				questionService.updateBlock(blockObject.questionId, blockObject);
			} else {
				//create question
				questionService.createBlock(createContent, $scope.block);
			}
			hideDialogBox();
			initData();
		}

		function createSubquestionContent(subquestion) {
			subquestionService.createContent(subquestion.$id, $scope.block);
		}

		function createSubquestionAnswer(subquestion) {
			answerService.createAnswer(subquestion.$id, $scope.block);
		}

		function createSubquestionSolution(subquestion) {
			subquestionService.createSolution(subquestion.$id, $scope.block);
		}

		function createTextContent() {
			$scope.block.contents.push({
				text: ""
			});
		}

		function close() {
			hideDialogBox();
			initData();
		}

		function initData() {
			$scope.block = {
				contents: [{
					text: ""
				}],
				type: 1
			};
			isSubquestion = false;
			isEditQuestionBlock = false;
			blockObject = null;
			createContent = null;
			blockType = null;
			editBlock = null;
		}

		function blockTypes() {
			return [{
				value: 1,
				text: '1'
			}, {
				value: 2,
				text: '2'
			}, {
				value: 3,
				text: '3'
			}, {
				value: 4,
				text: '4'
			}, {
				value: 5,
				text: '5'
			}, {
				value: 6,
				text: '6'
			}, {
				value: 7,
				text: '7'
			}];
		}

		function hideDialogBox() {
			$("#myModal").modal('hide');
			$scope.isShowContentDialog = false;
		}

		function showDialogBox() {
			$("#myModal").modal('show');
			$scope.isShowContentDialog = true;
		}
	}

})();
