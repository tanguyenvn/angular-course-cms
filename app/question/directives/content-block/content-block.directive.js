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

	function ContentBlockController($scope, subquestionService, questionService, answerService, SUBQUESTION_TYPE) {
		var vm = this;
		var isSubquestion = false;
		var isEditMode = false;
		var createContent, blockObject, blockType, editBlock;
		initData();
		$scope.isShowContentDialog = false;
		vm.save = save;
		vm.close = close;
		activate();

		$scope.$on("question-manage-show-content-dialog-box", function(event, data){
			showDialogBox();
			isSubquestion = false;
			createContent = data;
		})

		$scope.$on("subquestion-manage-show-content-dialog-box", function (event, data) {
			showDialogBox();
			isSubquestion = true;
			blockType = SUBQUESTION_TYPE.CONTENT;
			if(data.block){
				editBlock = data.subquestion;
				blockObject = data.block;
				$scope.block.contents = data.block.contents;
			}else{
				createContent = data;
			}

		});

		$scope.$on("subquestion-manage-show-answer-dialog-box", function (event, data) {
			showDialogBox();
			isSubquestion = true;
			blockType = SUBQUESTION_TYPE.ANSWER;
			if(data.block){
				editBlock = data.answer;
				blockObject = data.block;
				$scope.block.contents = data.block.contents;
			}else{
				createContent = data;
			}
		});

		$scope.$on("subquestion-manage-show-solution-dialog-box", function (event, data) {
			showDialogBox();
			isSubquestion = true;
			blockType = SUBQUESTION_TYPE.SULUTION;
			if(data.block){
				editBlock = data.subquestion;
				blockObject = data.block;
				$scope.block.contents = data.block.contents;
			}else{
				createContent = data;
			}
		});

		$scope.$on("question-manage-edit-block-dialog-box", function (event, data) {
			$scope.block.contents = data.contents;
			isEditMode = true;
			blockObject = data;
			showDialogBox();
		});

		function activate() {
			//config ckeditor
			$scope.ckeditorOptions = {
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

		function saveSubquestionContent(subquestion){
			subquestionService.createContent(subquestion.$id, $scope.block);
		}

		function saveSubquestionAnswer(subquestion){
			answerService.createAnswer(subquestion.$id, $scope.block);
		}

		function saveSubquestionSolution(subquestion){
			subquestionService.createSolution(subquestion.$id, $scope.block);
		}

		function save() {
			if (!isEditMode) {
				if (!isSubquestion) {
					questionService.createBlock(createContent, $scope.block);
				} else {
					if (blockType === SUBQUESTION_TYPE.CONTENT) {
						if(!editBlock){
							saveSubquestionContent(createContent);
						}else{
							blockObject.contents = $scope.block.contents;
							subquestionService.updateContentBlock(editBlock.$id, blockObject);
						}
					}
					if (blockType === SUBQUESTION_TYPE.SULUTION) {
						if(!editBlock){
							saveSubquestionSolution(createContent);
						}else{
							blockObject.contents = $scope.block.contents;
							subquestionService.updateSolutionBlock(editBlock.$id, blockObject);
						}

					} else if (blockType === SUBQUESTION_TYPE.ANSWER) {
						if(!editBlock){
							saveSubquestionAnswer(createContent);
						}else{
							blockObject.contents = $scope.block.contents;
							answerService.updateContentBlock(editBlock.$id, blockObject);
						}


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
			};
			isSubquestion = false;
			isEditMode = false;
			blockObject = null;
			createContent = null;
			blockType = null;
			editBlock = null;
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
