const request = require('request');

// arg1: options object, configs
// arg2: callback. will be called when data comes back from the http endpoint
request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=rua%20dom%20fernando%20109%20londrina',
  json: true,
}, (error, response, body) => {
  console.log(JSON.stringify(body, undefined, 2));
});