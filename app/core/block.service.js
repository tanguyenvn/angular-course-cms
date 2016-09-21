(function () {
	'use strict';

	angular
		.module('app.core')
		.factory('blockService', blockService);

	blockService.$inject = ['fileService'];

	function blockService(fileService) {
		var service = {
			createBlock: createBlock,
			updateBlock: updateBlock
		};
		return service;

		function createBlock(blocksRef, block) {
			var savingBlock = {
				type: block.type
			}
			var blockId = blocksRef.push(savingBlock).key;
			var blockRef = blocksRef.child(blockId);
			//save contents
			var contentsRef = blockRef.child('contents');
			block.contents.forEach(function (content) {
				contentsRef.push({
					text: content.text
				});
			});
			//save images
			var imagesRef = blockRef.child('images');
			block.images.forEach(function (image) {
				var path = "images/" + blockId + "/" + image.name;
				fileService.uploadFile(image.file, path);
				imagesRef.push({
					name: image.name,
					path: path
				});
			});
			//save audios
			var audiosRef = blockRef.child('audios');
			block.audios.forEach(function (audio) {
				var path = "audios/" + blockId + "/" + audio.name;
				fileService.uploadFile(audio.file, path);
				audiosRef.push({
					name: audio.name,
					path: path
				});
			});
			//save videos
			var videosRef = blockRef.child('videos');
			block.videos.forEach(function (video) {
				videosRef.push({
					title: video.title,
					link: video.link
				});
			});
			return blockId;
		}

		function updateBlock(blocksRef, block) {
			var blockId = block.$id;
			var blockRef = blocksRef.child(blockId);
			//update type
			var updateTypeInfo = {
				type: block.type
			}
			blockRef.update(updateTypeInfo);
			//update contents
			var contentsRef = blockRef.child('contents')
			block.contents.forEach(function (content) {
				//update for existed content
				if (content.$id) {
					if (content.toBeDeleted) {
						contentsRef.child(content.$id).remove();
					} else {
						contentsRef.child(content.$id).update({
							text: content.text
						});
					}
				}
				//create new content
				else {
					contentsRef.push({
						text: content.text
					});
				}
			});
			//update images
			var imagesRef = blockRef.child('images');
			block.images.forEach(function (image) {
				//remove existed image if marked deleted
				if (image.$id) {
					if (image.toBeDeleted) {
						fileService.deleteFile(image.path);
						imagesRef.child(image.$id).remove();
					}
				}
				//create new image
				else {
					var path = "images/" + blockId + "/" + image.name;
					fileService.uploadFile(image.file, path);
					imagesRef.push({
						name: image.name,
						path: path
					});
				}
			});
			//update audios
			var audiosRef = blockRef.child('audios');
			block.audios.forEach(function (audio) {
				//remove existed audio if marked deleted
				if (audio.$id) {
					if (audio.toBeDeleted) {
						fileService.deleteFile(audio.path);
						audiosRef.child(audio.$id).remove();
					}
				}
				//create new audio
				else {
					var path = "audios/" + blockId + "/" + audio.name;
					fileService.uploadFile(audio.file, path);
					audiosRef.push({
						name: audio.name,
						path: path
					});
				}
			});
			//update videos
			var videosRef = blockRef.child('videos');
			block.videos.forEach(function (video) {
				//remove existed video if marked deleted
				if (video.$id) {
					if (video.toBeDeleted) {
						videosRef.child(video.$id).remove();
					}
				}
				//create new video
				else {
					videosRef.push({
						title: video.title,
						link: video.link
					});
				}
			});
		}
	}

})();
