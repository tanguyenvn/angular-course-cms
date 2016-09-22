(function () {
	'use strict';

	angular
		.module('app.library')
		.directive('videoUpload', videoUpload);

	function videoUpload() {
		return {
			templateUrl: 'question/directives/video-upload/video-upload.template.html',
			restrict: 'E',
			controller: VideoUploadController,
			scope: {
				videos: '='
			}
		};
	}

	VideoUploadController.$inject = ['$scope'];

	function VideoUploadController($scope) {
		$scope.videos.push({
			title: $scope.videoTitle,
			link: $scope.videoLink
		});
	}

})();
