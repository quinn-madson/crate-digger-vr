// Import templates
var link = document.querySelector('link[rel="import"]');
if (link.import) {
	doImports();
} else {
	window.addEventListener('HTMLImportsLoaded', function () {
		doImports();
	});
}

function doImports () {
	var templates = link.import.querySelectorAll('template');
	templates.forEach(function(template) {
		var clone = document.importNode(template, true);
		document.querySelector('a-assets').appendChild(clone);
	});
	// Define custom schema for syncing avatar color, set by random-color
	window.NAF.schemas.add({
		template: '#avatar-template',
		components: [
			'position',
			'rotation',
		]
	});
	// a-assets loading is paused until templates are loaded
	document.getElementById('waitfortemplates').dispatchEvent(new window.CustomEvent('load'));
}
