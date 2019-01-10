

// Input favorite Spotify playlist ID
var spotifyPlaylist = "2rTfqndrWzDgP6wEw0Lplw"


// var recordCount = 10;

document.addEventListener('DOMContentLoaded', function () {
  console.log('>> APP INIT <<')
  setTimeout(function () {
    getRecords();
  }, 5000)

  document.addEventListener('abuttondown', recordRain) // oculus
  document.addEventListener('bbuttondown', hitItJohnny) // oculus
  document.addEventListener('xbuttondown', stopPlayback) // oculus
  document.addEventListener('menudown', recordRain) // vive
});

function hitItJohnny() {
  console.log('exec hitItJohnny')
  playRecord(14428)
}

function stopPlayback() {
  console.log('exec stopPlayback')
  window.player.pause();
  // window.document.querySelector('#hifi').components.sound.stopSound();
}

function getRecords() {
  window.fetch(
    `https://api.spotify.com/v1/playlists/${spotifyPlaylist}`, {
        headers: new window.Headers({
          'Authorization': `Bearer ${accessToken}`
        })
      }).then(function (response) {
        return response.json();
      })
      .then(function (resJson) {
        var tracks = resJson.tracks.items;
        for (var i = 0; i < tracks.length; i++) {
          var track  = tracks[i].track
          var album = track.album
          var recordSleeve = window.document.createElement('a-entity');
          recordSleeve.setAttribute('class', 'record-sleeve');
          recordSleeve.setAttribute('record-sleeve', 'cover: ' + album.images[0].url + '; info: ' + JSON.stringify(track));
          window.AFRAME.scenes[0].appendChild(recordSleeve);
        }
      })
}

function playTrack(trackId) {
  window.fetch(
    `https://api.spotify.com/v1/me/player/play?device_id=${window.playerId}`, {
      method: 'PUT',
      headers: new window.Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }),
      body: JSON.stringify({
        uris: [`spotify:track:${trackId}`]
      })
    }).then(function (response) {
      console.log(response);
  })
}

function playVideo() {
  var video = window.document.querySelector('#music-video');
  video.play();
}

function pauseVideo() {
  var video = window.document.querySelector('#music-video');
  video.pause();
}