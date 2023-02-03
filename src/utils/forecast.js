const request = require('postman-request')
const {uvDesc_extreme, uvDesc_high, uvDesc_low, uvDesc_min, uvDesc_mod} = require('../../constants/constant')

const forecast = (longitude, latitude, callback) => {
 const url = `http://api.weatherstack.com/current?access_key=837423aaa760926d3211f1fc4f9c91ac&query=${latitude},${longitude}&units=m`

 request({url, json: true}, (error, response, body) => {
  if (error) {
   callback('Unable to connect to weather services!', undefined)
  } else if (body.error) {
   callback('Unable to find location', undefined)
  } else {
   console.log(body.current);
   const { weather_descriptions, temperature, feelslike, uv_index, is_day } = body.current

   const weatherDesc = `${weather_descriptions[0]}. `
   const tempDesc = `It is currently ${String(temperature)} degrees out. It feels like ${feelslike} degrees out. `
   var uvDesc = `UV index: ${uv_index}. ` 

   if (uv_index >= 11){
    uvDesc += uvDesc_extreme
   } else if ( uv_index >= 8 && uv_index <= 10){
    uvDesc += uvDesc_high || ''
   } else if (uv_index >= 6 && uv_index <= 7){
    uvDesc += uvDesc_mod || ''
   } else if (uv_index >= 3 && uv_index <= 5){
    uvDesc += uvDesc_low || ''
   } else if (uv_index >= 0 && uv_index <= 2){
    uvDesc += uvDesc_min || ''
   }

   callback(undefined, {weatherDesc, tempDesc, uvDesc})
  }
 })
}

module.exports = forecast