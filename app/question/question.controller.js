(function () {
	'use strict';

	angular
		.module('app.question')
		.controller('QuestionController', QuestionController);

	QuestionController.$inject = ['question', 'blockService'];

	function QuestionController(question, blockService) {
		var vm = this;
		vm.modal = false;
		vm.question = question;
		vm.open = function open() {
			console.log('open ' + vm.modal);
			vm.modal = true;
		}
		vm.questionContentBlocks = blockService.getBlocksOfQuestion(question.$id);
	}
})();
