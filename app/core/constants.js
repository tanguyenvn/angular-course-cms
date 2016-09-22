(function () {
	'use strict';

	angular
		.module('app.core')
		.constant('BLOCK_TYPE', {
			"CONTENT": "content",
			"ANSWER": "answer",
			"SOLUTION": "solution"
		});

	angular
		.module('app.core')
		.constant('SUBQUESTION_TYPE', {
			"SINGLE_CHOICE": "Trắc nghiệm",
			"FILL_TEXT": "Điền từ",
			"ANIMATION_1": "Sắp xếp từ",
			"ANIMATION_2": "Sắp xếp từ đoạn văn"
		});
})();
