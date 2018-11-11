window.AFRAME.registerComponent('turntable', {
	schema: {
	},
	init: function () {
		this.el.addEventListener('drag-drop', function (evt) {
			console.log('>>>> DRAG DROP	evt.detail.dropped: ', evt.detail.dropped)
		})
	},
	update: function () {},
	remove: function () {},
});