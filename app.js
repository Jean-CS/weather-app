const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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
    weather.getWeather(results.latitude, results.longitude, (err, weatherResults) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`The weather in ${results.address} is ${weatherResults.summary} and ${weatherResults.temperature} degrees.`);
      }
    });
  }
});