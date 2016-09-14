(function () {
	'use strict';

	angular
		.module('app.core')
		.factory('imageService', imageService);

	imageService.$inject = ['firebaseStorageService', 'blockService'];

	function imageService(firebaseStorageService, blockService) {
		var service = {
			upload: upload,
		};
		return service;

		function upload(file, blockId) {
			var uploadTask = firebaseStorageService.questionImages.child(blockId).child(file.name).put(file);
			uploadTask.on('state_changed', function (snapshot) {
					/*var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + progress + '% done');
					switch (snapshot.state) {
						case firebase.storage.TaskState.PAUSED: // or 'paused'
							console.log('Upload is paused');
							break;
						case firebase.storage.TaskState.RUNNING: // or 'running'
							console.log('Upload is running');
							break;
					}*/
				},
				function (error) {
					console.log("Error uploading file");
				},
				function () {
					var downloadURL = uploadTask.snapshot.downloadURL;
					var image = {
						fileName: file.name,
						downloadUrl: downloadURL
					}
					blockService.saveImage(blockId, image);
				});
		}
	}

})();
