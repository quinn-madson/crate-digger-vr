AFRAME.registerComponent('tv-component', {
  dependencies: ['raycaster'],

  init: function () {
    var tv = window.document.createElement('a-entity');
    tv.setAttribute('mixin', 'tv-model');
    this.el.addEventListener('raycaster-intersected', function () {
      playVideo();
      console.log('intercepted -----')
    });
    this.el.appendChild(tv);
  }
});
