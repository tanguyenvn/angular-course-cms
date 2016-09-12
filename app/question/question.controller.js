(function () {
	'use strict';

	angular
		.module('app.question')
		.controller('QuestionController', QuestionController);

	QuestionController.$inject = ['questionService'];

	function QuestionController(questionService) {
		var vm = this;
		vm.questions = questionService.getById('-KRTMOIKZXGjmdCeKxzA');

		console.log("quesion vm: ", vm.question);
	}

})();
