(function () {
	'use strict';

	angular
		.module('app.question')
		.config(configFunction);

	configFunction.$inject = ['$routeProvider'];

	function configFunction($routeProvider) {
		$routeProvider.when('/question/:questionId', {
			templateUrl: 'question/question.template.html',
			controller: 'QuestionController',
			controllerAs: 'vm',
			resolve: { //wait until question is loaded
				question: resolveQuestion
			}
		});
	}

	resolveQuestion.$inject = ['questionService', '$route'];

	function resolveQuestion(questionService, $route) {
		return questionService.getById($route.current.params.questionId);
	}

})();
