const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    const key = 'f5fbeeb7aeec40d039f66b8feaec953f';
    let lat = results.latitude;
    let lng = results.longitude;

    request({
      url: `https://api.darksky.net/forecast/${key}/${lat},${lng}`,
      json: true
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        console.log(`Weather: ${body.currently.summary}`);
        console.log(`Temperature: ${body.currently.temperature}`);
      } else {
        console.log('Unable to fetch weather.');
      }
    });
  }
});