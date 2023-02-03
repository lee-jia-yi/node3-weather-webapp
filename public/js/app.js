console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const weather = document.querySelector('#weather')
const temperature = document.querySelector('#temperature')
const uv_index = document.querySelector('#uv_index')

weatherForm.addEventListener('submit', (e) => {
 e.preventDefault()
 weather.textContent = 'Loading...'
 temperature.textContent = ''

 const location = search.value
 fetch(`/weather?address=${location}`).then((response) => {
  response.json().then((data) => {
   if (data.error) {
    weather.textContent = data.error
   } else {
    const { weatherDesc, tempDesc, uvDesc} = data.forecast
    weather.textContent = weatherDesc
    temperature.textContent = tempDesc
    uv_index.textContent = uvDesc
   }
  })
 })
})