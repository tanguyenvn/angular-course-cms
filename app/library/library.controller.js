(function () {
	'use strict';

	angular
		.module('app.library')
		.controller('LibraryController', LibraryController);

	LibraryController.$inject = ['questions'];

	function LibraryController(questions) {
		var vm = this;
		vm.questions = questions;
		vm.tai = "ntttai";
	}

})();
