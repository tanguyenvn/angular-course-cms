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
				modal: '=',
				question: '='
			}
		};
	}

	ContentBlockController.$inject = ['$scope', 'blockService', 'answerService'];

	function ContentBlockController($scope, blockService, answerService) {
		var vm = this;
		var blockType;
		var subQuestion = false;
		var isEditMode = false;
		var blockObject;
		initData();
		$scope.isShowContentDialog = false;

		$scope.ckeditorOptions = {
			height: 200,
			toolbar: [
				['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink'],
				['FontSize', 'TextColor', 'BGColor']
			]
		};

		function initData() {
			$scope.newBlock = {
				contents: ""
			}
		}


		$scope.$on("show-content-block-dialog-box", function (event, data) {
			if (data.isShowDialog) {
				showDialogBox();
				if (data.question) {
					$scope.newBlock.question = data.question;
				} else if (data.subQuestion) {
					subQuestion = data.subQuestion;
					blockType = data.blockType;
				}
			} else {
				hideDialogBox();
			}
		});

		$scope.$on("edit-block-content-dialog", function(event, data){
			$scope.newBlock.contents = data.contents;
			isEditMode = true;
			blockObject = data;
			showDialogBox();
		});

		vm.close = function close() {
			hideDialogBox();
			initData();
		}

		vm.save = function save() {
			if(!isEditMode){
				if ($scope.newBlock.question && !subQuestion) {
					blockService.save($scope.newBlock);
					blockService.getBlocksOfQuestion(vm.question.$id);
				} else {
					if (subQuestion) {
						if (blockType == 'content' || blockType == 'solution'){
							$scope.newBlock.subQuestion = subQuestion.$id;
							$scope.newBlock.blockType = blockType;
							blockService.save($scope.newBlock);
						} else if (blockType == 'answer') {
							var answerId = createNewAnswer();
							$scope.newBlock.answer = answerId;
							$scope.newBlock.blockType = blockType;
							blockService.save($scope.newBlock);
						}
						blockService.getBlocksOfSubQuestion(subQuestion.$id);
						blockService.getBlocksSolutionOfSubQuestion(subQuestion.$id);
					} else {
						console.log("COULD BE A BUG");
					}
				}
			}else{
				blockObject.contents = $scope.newBlock.contents;
				blockService.editBlock(blockObject);
			}
			hideDialogBox();
			initData();
		}

		function createNewAnswer(){
			var newAnswer = new answerService.Answer(subQuestion.$id);
			return answerService.save(newAnswer);
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
