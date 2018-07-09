const request = require('request');
const yargs = require('yargs');

const argv = yargs
  .options({
    address: {
      demand: true,
      alias: 'a',
      describre: 'Address to fetch weather for',
      string: true // always parse command as string
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

let encodedAddress = encodeURIComponent(argv.address);

// arg1: options object, configs
// arg2: callback. will be called when data comes back from the http endpoint
request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
  json: true,
}, (error, response, body) => {
  if (error) {
    console.log('Unable to connect to google servers.');
  } else if (body.status === 'ZERO_RESULTS') {
    console.log('Unable to find that address');
  } else if (body.status === 'OK'){
    let result = body.results[0];
    let location = result.geometry.location;

    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${location.lat}`);
    console.log(`Latitude: ${location.lng}`);
  }
});