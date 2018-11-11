AFRAME.registerComponent('tv-component', {
  dependencies: ['raycaster'],

  init: function () {
    var tv = window.document.createElement('a-entity');
    var video = window.document.querySelector('#music-video');
    tv.setAttribute('mixin', 'tv-model');
    var that = this;
    this.el.addEventListener('raycaster-intersected', function () {
      if (!that.lock) {
        that.lock = true;
        if (!video.paused) {
          pauseVideo();
        } else {
          playVideo();
        }
        setTimeout(function() {
          that.lock = false;
        }, 2000)
      }
    });
    this.el.appendChild(tv);
  },
  lock: false
});