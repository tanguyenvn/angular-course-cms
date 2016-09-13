(function () {
	'use strict';

	angular
		.module('app.question')
		.controller('QuestionController', QuestionController);

	QuestionController.$inject = ['question'];

	function QuestionController(question) {
		var vm = this;
		vm.modal = false;
		vm.question = question;
		vm.open = function open() {
			console.log('open ' + vm.modal);
			vm.modal = true;
		}
	}
})();
