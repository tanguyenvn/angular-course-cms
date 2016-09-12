(function () {
	'use strict';

	angular
		.module('app.layout')
		.directive('navbar', navbar);

	function navbar() {
		return {
			templateUrl: 'layout/navbar.template.html',
			restrict: 'E',
		}
	}

})();
