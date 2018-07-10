const request = require('request');

const key = 'f5fbeeb7aeec40d039f66b8feaec953f';

module.exports = {
  getWeather: (lat, lng, callback) => {
    request({
      url: `https://api.darksky.net/forecast/${key}/${lat},${lng}`,
      json: true
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(undefined, {
          summary: body.currently.summary,
          temperature: body.currently.temperature
        })
      } else {
        callback('Unable to fetch weather.');
      }
    });
  }
}