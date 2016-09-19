(function () {
	'use strict';

	angular
		.module('app.question')
		.controller('QuestionController', QuestionController);

	QuestionController.$inject = ['question', '$scope'];

	function QuestionController(question, $scope) {
		var vm = this;
		vm.question = question;
		$scope.$on("question-show-content-dialog-box", function(event, data){
			$scope.$broadcast('question-manage-show-content-dialog-box', data);
		})

		$scope.$on("subquestion-show-content-dialog-box", function(event, data){
			$scope.$broadcast('subquestion-manage-show-content-dialog-box', data);
		});

		$scope.$on("subquestion-show-answer-dialog-box", function(event, data){
			$scope.$broadcast('subquestion-manage-show-answer-dialog-box', data);
		});

		$scope.$on("subquestion-show-solution-dialog-box", function(event, data){
			$scope.$broadcast('subquestion-manage-show-solution-dialog-box', data);
		});

		$scope.$on("question-edit-block-dialog-box", function(event, data){
			$scope.$broadcast('question-manage-edit-block-dialog-box', data);
		});
	}
	/*var mouseWheelEvt = function (event) {
	    if (document.body.doScroll)
	        document.body.doScroll(event.wheelDelta>0?"left":"right");
	    else if ((event.wheelDelta || event.detail) > 0)
	        document.body.scrollLeft -= 100;
	    else
	        document.body.scrollLeft += 100;

	    return false;
	}
	document.body.addEventListener("mousewheel", mouseWheelEvt);*/
})();
