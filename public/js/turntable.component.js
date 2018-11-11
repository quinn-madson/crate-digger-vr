window.AFRAME.registerComponent('turntable', {
	play: function () {
		this.el.addEventListener('drag-drop', function (evt) {
			var info = evt.detail.dropped.getAttribute('info')
			var albumId = evt.detail.dropped.getAttribute('albumId')
			playRecord(albumId)
		})
	}
});