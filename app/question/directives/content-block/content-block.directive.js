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

	ContentBlockController.$inject = ['$scope', 'blockService'];

	function ContentBlockController($scope, blockService) {
		var vm = this;
		var blockType;
		var subQuestion = false;
		initData();
		$scope.isShowContentDialog = false;

		function initData() {
			$scope.newBlock = {
				content: "",
				question: "",
				subQuestion: ""
			}
		}


		$scope.$on("show-content-block-dialog-box", function (event, data) {
			if (data.isShowDialog) {
				showDialogBox();
				if (data.question) {
					$scope.newBlock.question = data.question;
				} else if (data.subQuestion) {
					$scope.newBlock.subQuestion = null;
					subQuestion = data.subQuestion;
					blockType = data.blockType;
				}

			} else {
				hideDialogBox();
			}
		});

		vm.close = function close() {
			hideDialogBox();
			initData();
		}

		vm.save = function save() {
			//save as question block
			if ($scope.newBlock.question && !subQuestion) {
				console.log("Save block to question");
				blockService.save($scope.newBlock);
			} else {
				if (subQuestion) {
					if (blockType == 'content') {
						console.log("TODO - Save CONTENT");
					} else if (blockType == 'answer') {
						console.log("TODO - Save ANSWER");
					} else if (blockType == 'hint') {
						console.log("TODO - Save HINT");
					}
					console.log($scope.newBlock)
				} else {
					console.log("COULD BE A BUG");
				}
			}

			hideDialogBox();
			blockService.getBlocksOfQuestion(vm.question.$id);
			initData();
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
