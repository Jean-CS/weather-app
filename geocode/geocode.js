const request = require('request');

module.exports = {
  geocodeAddress: (address, callback) => {
    let encodedAddress = encodeURIComponent(address);

    // arg1: options object, configs
    // arg2: callback. will be called when data comes back from the http endpoint
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true,
    }, (error, response, body) => {
      if (error) {
        callback('Unable to connect to google servers.')
      } else if (body.status === 'ZERO_RESULTS') {
        callback('Unable to find that address');
      } else if (body.status === 'OK') {
        let result = body.results[0];
        let location = result.geometry.location;

        callback(undefined, {
          address: result.formatted_address,
          latitude: location.lat,
          longitude: location.lng,
        });
      }
    });
  }
}