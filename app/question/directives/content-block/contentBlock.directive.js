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
		vm.newBlock = {
			contents: "",
			question: vm.question.$id
		}

		$scope.$watch('vm.modal', function () {
			if (vm.modal) {
				$("#myModal").modal('show');
			} else {
				$("#myModal").modal('hide');
			}
		});

		vm.close = function close() {
			vm.modal = false;
		}

		vm.save = function save() {
			blockService.save(vm.newBlock);
			vm.modal = false;
			blockService.getBlocksOfQuestion(vm.question.$id);
			vm.newBlock.contents = "";
		}
	}

})();
