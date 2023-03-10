const request = require('postman-request')

const geocode = (address, callback) => {
 const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamlheWlsZWUiLCJhIjoiY2xkOGhzZzE5MDZraTNvcGV6b3ZyanNlcCJ9.wnkLDP81HXolHxBR_kr0UA&limit=1'

 request({ url, json: true}, (error, response, body) => {
  if (error) {
   // pass it back to callback func 
   // encourage reusability -> up to the individual geocode calls to determine how they want to handle it 
   callback('Unable to connect to location services!', undefined)
  } else if (body.features.length === 0) {
   callback('Unable to find location. Try another search.', undefined);
  } else {
   callback(undefined, {
    latitude: body.features[0].center[1], 
    longitude: body.features[0].center[0], 
    location: body.features[0].place_name
   })
  }
 })
}

module.exports = geocode