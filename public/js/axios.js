// var instance = axios.create({
//   baseURL: 'http://api.7digital.com/1.2/',
//   params: {
//     oauth_consumer_key: '7d4vr6cgb392',
//     consumer_secret: 'm4ntskavq56rddsa',
//     shopId: '2020',
//     usageTypes: 'adsupportedstreaming'
//   },
//   headers: {
//     accept: 'application/json'
//   }
// });

// console.log(instance);

const getAlbum = (artistId, releaseId) => {
  // Fetch release
  axios.get('http://api.7digital.com/1.2/release/details', {
    params: {
      releaseId: releaseId,
      oauth_consumer_key: '7d4vr6cgb392',
      consumer_secret: 'm4ntskavq56rddsa',
      shopId: '2020',
      usageTypes: 'adsupportedstreaming'
    },
    headers: {
      accept: 'application/json'
    }
  })
  .then(response => {
    console.log(response.data);
    return response;
  });
}

console.log(getAlbum(null , '5726299'));

