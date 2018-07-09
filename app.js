const request = require('request');

// arg1: options object, configs
// arg2: callback. will be called when data comes back from the http endpoint
request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=rua%20dom%20fernando%20109%20londrina',
  json: true,
}, (error, response, body) => {
  let result = body.results[0];
  let location = result.geometry.location;

  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`Latitude: ${location.lat}`);
  console.log(`Latitude: ${location.lng}`);
});