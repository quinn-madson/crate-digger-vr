window.AFRAME.registerComponent('record-component', {
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
    this.el.appendChild(record)
	},
	update: function () {},
	remove: function () {},
});