(function () {
	'use strict';

	angular
		.module('app.question')
		.controller('QuestionController', QuestionController);

	QuestionController.$inject = ['question', '$scope'];

	function QuestionController(question, $scope) {
		var vm = this;
		vm.modal = false;
		vm.question = question;
		$scope.$on("show-content-dialog-box", function(event, data){
			$scope.$broadcast('show-content-block-dialog-box', data);
		});
		$scope.$on("edit-block-content-dialog-box", function(event, data){
			$scope.$broadcast('edit-block-content-dialog', data);
		});
	}
})();
