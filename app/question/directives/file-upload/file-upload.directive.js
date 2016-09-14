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
				block: '='
			}
		};
	}

	FileUploadController.$inject = ['$scope', 'imageService', 'blockService'];

	function FileUploadController($scope, imageService, blockService) {
		var vm = this;
		var blockObj;

		$scope.upload = function (file) {
			console.log(blockObj);
			if (blockObj) {
				imageService.upload(file, blockObj.$id);
			}
		}

		$scope.$on("edit-block-content-dialog", function (event, data) {
			blockObj = data;
			vm.images = blockService.getImages(blockObj.$id);
		});
	}

})();
