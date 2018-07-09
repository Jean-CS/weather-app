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
    console.log(JSON.stringify(results, undefined, 2));
  }
});