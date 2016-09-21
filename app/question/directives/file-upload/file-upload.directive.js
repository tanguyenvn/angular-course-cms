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
				files: '=',
				type: '@'
			}
		};
	}

	FileUploadController.$inject = ['$scope'];

	function FileUploadController($scope) {
		var vm = this;
		$scope.uploadFile = uploadFile;
		$scope.removeFile = removeFile;
		$scope.displayFileName = displayFileName;

		////////////

		function displayFileName(fileName) {
			var index = fileName.lastIndexOf('.');
			var name = fileName.substr(0, index);
			var extension = fileName.substr(index + 1);
			var displayName;
			var lengthLimit = 8;
			if (name.length > lengthLimit) {
				displayName = name.substr(0, lengthLimit) + '...' + extension;
			} else {
				displayName = name.substr(0, lengthLimit) + '.' + extension;
			}
			return displayName;
		}

		function uploadFile(files) {
			if (files) {
				files.forEach(function (file) {
					var fileName = file.name;
					if (fileDuplicated(file, vm.files)) {
						fileName = newFileName(fileName);
					}
					vm.files.push({
						file: file,
						name: fileName
					});
				});
			} else {
				console.log("file not found");
			}
		}

		function removeFile(file, index) {
			if (file.$id) {
				file.toBeDeleted = true;
			} else {
				vm.files.splice(index);
			}
		}

		function fileDuplicated(checkingFile, files) {
			var isDuplicated = false;
			files.forEach(function (file) {
				if (!file.toBeDeleted && (file.name === checkingFile.name)) {
					isDuplicated = true;
				}
			});
			return isDuplicated;
		}

		function newFileName(fileName) {
			var index = fileName.lastIndexOf('.');
			var name = fileName.substr(0, index);
			var extension = fileName.substr(index + 1);
			return name + '(1).' + extension;
		}

	}

})();
