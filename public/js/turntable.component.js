window.AFRAME.registerComponent('turntable', {
	play: function () {
		this.el.addEventListener('drag-drop', function (evt) {
			console.log('drag-drop')
			var info = evt.detail.dropped.getAttribute('info')
			var trackId = evt.detail.dropped.getAttribute('trackId')
			playTrack(trackId)
		})
	}
});