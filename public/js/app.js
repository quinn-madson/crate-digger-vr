document.addEventListener('DOMContentLoaded', function () {
  console.log('>> APP INIT <<')
  getRecords();
});

function getRecords() {
  window.fetch(
    'http://api.7digital.com/1.2/artist/releases?shopId=2020&oauth_consumer_key=7d4vr6cgb392&artistId=1448&usageTypes=adsupportedstreaming&imageSize=800', {
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
        var recordSleeve = window.document.createElement('a-entity');
        recordSleeve.setAttribute('record-sleeve', 'cover: ' + releases[i].image);
        window.AFRAME.scenes[0].appendChild(recordSleeve);
      }
    })
}

function audioTest() {
  var httpMethod = 'GET',
    url = 'https://stream.svc.7digital.net/stream/catalogue',
    parameters = {
      oauth_consumer_key: '7d4vr6cgb392',
      oauth_nonce: Math.floor(Math.random() * 1e9),
      oauth_timestamp: Math.floor((new Date()).getTime() / 1000),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_version: '1.0',
      shopId: 2020,
      trackId: 8216660
    },
    consumerSecret = 'm4ntskavq56rddsa';
  // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
  var encodedSignature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret);
  // generates a BASE64 encode HMAC-SHA1 hash
  var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, {
    encodeSignature: false
  });
  console.log('encodedSignature: ', encodedSignature);
  console.log('signature: ', signature);
  // var streamUrl = url + '?oauth_consumer_key=' + parameters.oauth_consumer_key + '&oauth_nonce=' + oauth_nonce +
  // '&oauth_timestamp=' + parameters.oauth_timestamp + '&' ;
  var streamUrl = url + '?';
  var paramFirstRun = true;
  for (var param in parameters) {
    streamUrl = streamUrl + param + '=' + parameters[param] + '&';
  }
  streamUrl = streamUrl + 'oauth_signature=' + encodedSignature;
  console.log('streamUrl = ', streamUrl);
  window.document.querySelector('#hifi').setAttribute('src', streamUrl);
  var x = window.document.querySelector('#hifi').components.sound.playSound();
  console.log('x: ', x);
}