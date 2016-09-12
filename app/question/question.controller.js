(function () {
	'use strict';

	angular
		.module('app.question')
		.controller('QuestionController', QuestionController);

	QuestionController.$inject = ['questionService'];

	function QuestionController(questionService) {
		var vm = this;
		vm.question = questionService.getById('-KRTMOIKZXGjmdCeKxzA');
	}

})();
