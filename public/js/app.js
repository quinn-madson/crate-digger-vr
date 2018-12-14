var recordCount = 10;
var spotifyPlaylist = "2rTfqndrWzDgP6wEw0Lplw"

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

function recordRain() {
  if (recordCount > 50) {
    document.querySelectorAll('.record-sleeve').forEach(function (a) {
      a.parentElement.removeChild(a);
      recordCount = 0;
    });
  }
  let artists = [
    383, //ramones
    // 9604, //velvet underground
    // 364, //beach boys
    // 69816, //dick dale
    138, //diana ross
    133, //ella fitzgerald
    6227, // oingo boingo
    1448 //johnny cash
  ]
  let artistId = artists[Math.floor(Math.random() * artists.length)]
  console.log('>>>> recordRain: ', artistId)
  window.fetch(
    'https://api.7digital.com/1.2/artist/releases?shopId=2020&oauth_consumer_key=7d4vr6cgb392&artistId=' + artistId + '&usageTypes=adsupportedstreaming&imageSize=800', {
      headers: new window.Headers({
        'accept': 'application/json'
      })
    }).then(function (response) {
    return response.json();
  })
  .then(function (resJson) {
    var releases = resJson.releases.releases;
    console.log(releases);
    for (var i = 0; i < releases.length; i++) {
      var release = releases[i]
      var recordSleeve = window.document.createElement('a-entity');
      recordSleeve.setAttribute('class', 'record-sleeve');
      recordSleeve.setAttribute('record-sleeve', 'cover: ' + release.image.replace('http://', 'https://') + '; info: ' + JSON.stringify(release));
      window.AFRAME.scenes[0].appendChild(recordSleeve);
      recordCount = recordCount + 1;
    }
  })
}

// function getRecords() {
//   window.fetch(
//     'https://api.7digital.com/1.2/artist/releases?shopId=2020&oauth_consumer_key=7d4vr6cgb392&artistId=1448&usageTypes=adsupportedstreaming&imageSize=800', {
//         headers: new window.Headers({
//           'accept': 'application/json'
//         })
//       }).then(function (response) {
//         return response.json();
//       })
//       .then(function (resJson) {
//         var releases = resJson.releases.releases;
//         console.log(releases);
//         for (var i = 0; i < releases.length; i++) {
//           var release  = releases[i]
//           var recordSleeve = window.document.createElement('a-entity');
//           recordSleeve.setAttribute('class', 'record-sleeve');
//           recordSleeve.setAttribute('record-sleeve', 'cover: ' + release.image.replace('http://', 'https://') + '; info: ' + JSON.stringify(release));
//           window.AFRAME.scenes[0].appendChild(recordSleeve);
//         }
//       })
// }
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

// function playRecord(albumId) {
//   window.fetch(
//       'https://api.7digital.com/1.2/release/tracks?shopId=2020&oauth_consumer_key=7d4vr6cgb392&releaseId=' + albumId + '&usageTypes=adsupportedstreaming', {
//         headers: new window.Headers({
//           'accept': 'application/json'
//         })
//       }).then(function (response) {
//       return response.json();
//     })
//     .then(function (resJson) {
//       console.log('getTracks: ', resJson)
//       playTrack(resJson.tracks[0].id)
//     })
// }

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
  // var streamUrl = url + '?';
  // var paramFirstRun = true;
  // for (var param in parameters) {
  //   streamUrl = streamUrl + param + '=' + parameters[param] + '&';
  // }
  // streamUrl = streamUrl + 'oauth_signature=' + encodedSignature;
  // window.document.querySelector('#hifi').setAttribute('src', streamUrl);
  // window.document.querySelector('#hifi').components.sound.playSound();
}

// function getTracks(albumId) {
//   window.fetch(
//       'https://api.7digital.com/1.2/release/tracks?shopId=2020&oauth_consumer_key=7d4vr6cgb392&releaseId=' + albumId + '&usageTypes=adsupportedstreaming', {
//         headers: new window.Headers({
//           'accept': 'application/json'
//         })
//       }).then(function (response) {
//       return response.json();
//     })
//     .then(function (resJson) {
//       console.log('getTracks: ', resJson)
//     })
// }

// function audioTest() {
//   var httpMethod = 'GET',
//     url = 'https://stream.svc.7digital.net/stream/catalogue',
//     parameters = {
//       oauth_consumer_key: '7d4vr6cgb392',
//       oauth_nonce: Math.floor(Math.random() * 1e9),
//       oauth_timestamp: Math.floor((new Date()).getTime() / 1000),
//       oauth_signature_method: 'HMAC-SHA1',
//       oauth_version: '1.0',
//       shopId: 2020,
//       trackId: 8216660
//     },
//     consumerSecret = 'm4ntskavq56rddsa';
//   // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
//   var encodedSignature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret);
//   // generates a BASE64 encode HMAC-SHA1 hash
//   var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, {
//     encodeSignature: false
//   });
//   console.log('encodedSignature: ', encodedSignature);
//   console.log('signature: ', signature);
//   // var streamUrl = url + '?oauth_consumer_key=' + parameters.oauth_consumer_key + '&oauth_nonce=' + oauth_nonce +
//   // '&oauth_timestamp=' + parameters.oauth_timestamp + '&' ;
//   var streamUrl = url + '?';
//   var paramFirstRun = true;
//   for (var param in parameters) {
//     streamUrl = streamUrl + param + '=' + parameters[param] + '&';
//   }
//   streamUrl = streamUrl + 'oauth_signature=' + encodedSignature;
//   console.log('streamUrl = ', streamUrl);
//   window.document.querySelector('#hifi').setAttribute('src', streamUrl);
//   var x = window.document.querySelector('#hifi').components.sound.playSound();
//   console.log('x: ', x);
// }

function playVideo() {
  var video = window.document.querySelector('#music-video');
  video.play();
}

function pauseVideo() {
  var video = window.document.querySelector('#music-video');
  video.pause();
}