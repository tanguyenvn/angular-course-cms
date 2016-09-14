(function () {
	'use strict';

	angular
		.module('app', [
			// Angular modules.
			'ngRoute',
			'ngSanitize',
			'ngFileUpload',
			'xeditable',
			// Third party modules.
			'firebase',
			'ngCkeditor',
			// Custom modules.
			'app.core',
			'app.landing',
			'app.library',
			'app.layout',
			'app.question'
		])
		.config(configFunction)
		.run(runFunction);

	configFunction.$inject = ['$routeProvider'];

	function configFunction($routeProvider) {
		$routeProvider.otherwise({
			redirectTo: '/'
		});
	}

	runFunction.$inject = ['$rootScope', '$location'];

	function runFunction($rootScope, $location) {
		$rootScope.$on('$routeChangeError', function (event, next, previous, error) {
			if (error === "AUTH_REQUIRED") {
				$location.path('/');
			}
		});
	}

})();
