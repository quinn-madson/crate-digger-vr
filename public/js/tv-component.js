AFRAME.registerComponent('tv-component', {
  dependencies: ['raycaster'],

  init: function () {
    var tv = window.document.createElement('a-entity');
    var video = window.document.querySelector('#music-video');
    tv.setAttribute('mixin', 'tv-model');
    this.el.addEventListener('raycaster-intersected', function () {
      if (video.seeking) {
        pauseVideo();
      } else {
        playVideo();
      }
    });
    this.el.appendChild(tv);
  }
});
