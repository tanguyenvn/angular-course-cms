(function () {
	'use strict';

	angular
		.module('app.library')
		.directive('fileUpload', fileUpload);

	function fileUpload() {
		return {
			templateUrl: 'question/directives/file-upload/file-upload.template.html',
			restrict: 'E',
			controller: FileUploadController,
			controllerAs: 'vm',
			bindToController: true,
			scope: {
				modal: '=',
				question: '='
			}
		};
	}

	FileUploadController.$inject = ['$scope', 'Upload', ];

	function FileUploadController($scope, Upload) {
		var vm = this;
		$scope.upload = function (file) {
			Upload.upload({
				url: 'upload/url',
				data: {
					file: file,
					'username': $scope.username
				}
			}).then(function (resp) {
				console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
			}, function (resp) {
				console.log('Error status: ' + resp.status);
			}, function (evt) {
				var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
				console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
			});
		};
	}

})();
