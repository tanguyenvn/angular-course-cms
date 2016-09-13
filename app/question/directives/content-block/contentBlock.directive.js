(function () {
		'use strict';

		angular
			.module('app.library')
			.directive('contentBlock', contentBlock);

		function contentBlock() {
			return {
				templateUrl: 'question/directives/content-block/contentBlock.template.html',
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
		$scope.isShowContentDialog = false;
		vm.newBlock = {
			contents: "",
			question: vm.question.$id
		}

		$scope.$on("show-content-block-dialog-box", function(event, data){
			if(data){
				showDialogBox();
			}else{
				hideDialogBox();
			}
		});

		vm.close = function close() {
			hideDialogBox();
		}

		vm.save = function save() {
			blockService.save(vm.newBlock);
			hideDialogBox();
			blockService.getBlocksOfQuestion(vm.question.$id);
			vm.newBlock.contents = "";
		}

		function hideDialogBox(){
			$("#myModal").modal('hide');
			$scope.isShowContentDialog = false;
		}

		function showDialogBox(){
			$("#myModal").modal('show');
			$scope.isShowContentDialog = true;
		}
	}

})();
