CKEDITOR.plugins.add('insertvariable', {
	icons: 'insertvariable',
	init: function (editor) {
		editor.addCommand('insertVariable', {
			exec: function (editor) {
				var element = CKEDITOR.dom.element.createFromHtml('<span onclick="alert(&#39;hello&#39;)" contenteditable=false class="chenbien">Biến<span class="chenbien-delete">x</span>');
				editor.insertElement(element);
			}
		});
		editor.ui.addButton('Insertvariable', {
			label: 'Chèn biến',
			command: 'insertVariable',
			toolbar: 'insert'
		});
	},
	afterInit: function (editor) {
		editor.on('click', function (evt) {
			alert('The number of changes in <em></b>.');
		});
	}
});
