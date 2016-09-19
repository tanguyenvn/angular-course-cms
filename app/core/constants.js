(function () {
	'use strict';

	angular
		.module('app.core')
		.constant('SUBQUESTION_TYPE', {
			"CONTENT": "content",
			"ANSWER": "answer",
			"SOLUTION": "solution"
		});
})();
