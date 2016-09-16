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

	ContentBlockController.$inject = ['$scope', 'subquestionService', 'questionService', 'answerService'];

	function ContentBlockController($scope, subquestionService, questionService, answerService) {
		var vm = this;
		var blockType;
		var subquestion = false;
		var isEditMode = false;
		var blockObject;
		initData();
		$scope.isShowContentDialog = false;

		vm.save = save;
		vm.close = close;

		activate();

		$scope.$on("show-content-block-dialog-box", function (event, data) {
			if (data.isShowDialog) {
				showDialogBox();
				if (data.question) {
					$scope.block.question = data.question;
				} else if (data.subquestion) {
					subquestion = data.subquestion;
					blockType = data.blockType;
				}
			} else {
				hideDialogBox();
			}
		});

		$scope.$on("edit-block-content-dialog", function (event, data) {
			$scope.block.contents = data.contents;
			isEditMode = true;
			blockObject = data;
			showDialogBox();
		});

		////////////

		function activate() {
			//config ckeditor
			$scope.ckeditorOptions = {
				height: 200,
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
			if (!isEditMode) {
				if ($scope.block.question && !subquestion) {
					questionService.createBlock($scope.block.question, $scope.block);
				} else {
					if (subquestion) {
						if (blockType === 'content') {
							subquestionService.createContent(subquestion.$id, $scope.block);
						}
						if (blockType === 'solution') {
							subquestionService.createSolution(subquestion.$id, $scope.block);
						} else if (blockType === 'answer') {
							answerService.createAnswer(subquestion.$id, $scope.block);
						}
					} else {
						console.log("COULD BE A BUG");
					}
				}
			} else {
				blockObject.contents = $scope.block.contents;
				questionService.updateBlock(blockObject.question, blockObject);
			}
			hideDialogBox();
			initData();
		}

		function close() {
			hideDialogBox();
			initData();
		}

		function initData() {
			$scope.block = {
				contents: ""
			}
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
