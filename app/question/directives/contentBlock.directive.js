(function () {
	'use strict';

	angular
		.module('app.library')
		.directive('contentBlock', contentBlock);

	function contentBlock() {
		return {
			templateUrl: 'question/directives/contentBlock.template.html',
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

	ContentBlockController.$inject = ['$scope'];

	function ContentBlockController($scope) {
		var vm = this;

		$scope.$watch('vm.modal', function () {
			console.log('watch '+vm.modal);
			if (vm.modal) {
				$("#myModal").modal('show');
			} else {
				$("#myModal").modal('hide');
			}
		});

		vm.close = function close() {
			vm.modal = false;
		}
	}

})();
