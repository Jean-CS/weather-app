const yargs = require('yargs');
const axios = require('axios');

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
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl)
.then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address');
  }

  let location = response.data.results[0].geometry.location;
  const key = 'f5fbeeb7aeec40d039f66b8feaec953f';
  let weatherUrl = `https://api.darksky.net/forecast/${key}/${location.lat},${location.lng}`;

  return axios.get(weatherUrl); // returns a Promise, which goes to next chained '.then()'

}).then((response) => {
  debugger;
  console.log(`The weather is ${response.data.currently.summary} and ${response.data.currently.temperature} degrees.`);
}).catch((err) => {
  if (err.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(err.message); // prints the 'throw new Error(message)'
  }
});