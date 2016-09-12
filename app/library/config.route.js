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
		});
	}

})();
