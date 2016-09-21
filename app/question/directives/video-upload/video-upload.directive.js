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
		$scope.save = save;
		$scope.close = close;
		$scope.removeVideo = removeVideo;
		$scope.showVideoDialog = showVideoDialog;

		function save() {
			$scope.videos.push({
				title: $scope.videoTitle,
				link: $scope.videoLink
			});
			hideVideoDialog();
			initData();
		}

		function close() {
			initData();
			hideVideoDialog();
		}

		function removeVideo(video, index) {
			if (video.$id) {
				video.toBeDeleted = true;
			} else {
				$scope.videos.splice(index);
			}
		}

		function initData() {
			$scope.videoTitle = '';
			$scope.videoLink = '';
		}

		function showVideoDialog() {
			$scope.isShowVideoUploadDialog = true;
			$("#video-upload").modal('show');
		}

		function hideVideoDialog() {
			$("#video-upload").modal('hide');
			$scope.isShowVideoUploadDialog = false;
		}

	}

})();
