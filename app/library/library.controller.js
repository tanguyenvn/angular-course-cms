(function () {
	'use strict';

	angular
		.module('app.library')
		.controller('LibraryController', LibraryController);

	LibraryController.$inject = ['questionService'];

	function LibraryController(questionService) {
		var vm = this;
		vm.questions = questionService.getAll();
		vm.editQuestion = function(question){
			console.log('editQuestion', question);
		}
	}

})();
