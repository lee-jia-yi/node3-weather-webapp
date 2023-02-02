const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
 const url = `http://api.weatherstack.com/current?access_key=837423aaa760926d3211f1fc4f9c91ac&query=${latitude},${longitude}&units=m`

 request({url, json: true}, (error, response, body) => {
  if (error) {
   callback('Unable to connect to weather services!', undefined)
  } else if (body.error) {
   callback('Unable to find location', undefined)
  } else {
   callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + String(body.current.temperature) + ' degrees celsius out. It feels like ' + String(body.current.feelslike) + ' degrees celsius out.')
  }
 })
}

module.exports = forecast