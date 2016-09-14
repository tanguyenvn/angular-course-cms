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
