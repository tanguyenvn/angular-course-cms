(function () {
	'use strict';

	angular
		.module('app.core')
		.factory('fileService', fileService);

	fileService.$inject = ['firebaseStorageService'];

	function fileService(firebaseStorageService) {
		var service = {
			uploadFile: uploadFile,
			deleteFile: deleteFile
		};
		return service;

		function uploadFile(file, storagePath) {
			var uploadTask = firebaseStorageService.root.child(storagePath).put(file);
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
					//upload successfully
					return uploadTask.snapshot.downloadURL;
				});
		}

		function deleteFile(path) {
			var fileRef = firebaseStorageService.root.child(path);
			fileRef.delete().then(function () {
				/*console.log("delete file successfully");*/
			}).catch(function (error) {
				console.log("Uh-oh, an error occurred during deleting file!");
			});
		}
	}

})();
