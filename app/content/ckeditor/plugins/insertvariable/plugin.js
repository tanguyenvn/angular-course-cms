CKEDITOR.plugins.add('insertvariable', {
	icons: 'insertvariable',
	init: function (editor) {
		editor.addCommand('insertVariable', {
			exec: function (editor) {
				var element = CKEDITOR.dom.element.createFromHtml('<span contenteditable=false class="chenbien">Biến<span class="chenbien-delete">x</span>');
				editor.insertElement(element);
			}
		});
		editor.ui.addButton('Insertvariable', {
			label: 'Chèn biến',
			command: 'insertVariable',
			toolbar: 'insert'
		});
	}
});
