(function () {
	'use strict';

	angular
		.module('app.library')
		.config(configFunction);

	configFunction.$inject = ['$routeProvider'];

	function configFunction($routeProvider) {
		$routeProvider.when('/library', {
			templateUrl: 'library/library.template.html',
			controller: 'LibraryController',
			controllerAs: 'vm',
			resolve: {
				questions: resolveQuestions
			}
		});
	}

	resolveQuestions.$inject = ['questionService'];

	function resolveQuestions(questionService) {
		return questionService.getAll();
	}

})();
