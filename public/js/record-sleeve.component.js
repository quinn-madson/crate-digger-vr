window.AFRAME.registerComponent('record-sleeve', {
	schema: {
		// defaults
		cover: {
			default: 'none'
		}
	},
	init: function () {
    var record = window.document.createElement('a-box');
    record.setAttribute('mixin', 'record')
    if (this.data.cover !== 'none') {
      record.setAttribute('src', this.data.cover)
    } else {
      record.setAttribute('color', '#0f0')
		}
		record.setAttribute('info', this.data.info)
		var trackId = JSON.parse(this.data.info).id;
		record.setAttribute('trackId', trackId)
		this.el.appendChild(record)
		//play on stretch
		this.el.addEventListener('stretch-start', function (evt) {
			playTrack(evt.originalTarget.attributes.trackId.value)
		})
	},
	update: function () {},
	remove: function () {},
});