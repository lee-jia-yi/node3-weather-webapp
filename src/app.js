const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
 res.render('index', {
  title: 'Weather App', 
  name: 'Jia Yi'
 })
})

app.get('/about', (req, res) => {
 res.render('about', {
  title: 'About Me', 
  name: 'Jia Yi'
 })
})

app.get('/help', (req, res) => {
 res.render('help', {
  title: 'Help Page', 
  message: 'This is a help message!', 
  name: 'Jia Yi'
 })
})

// catch for routes after /help
app.get('/help/*', (req, res) => {
 res.render('404', {
  title: '404 Page', 
  errorMessage: 'Help article not found', 
  name: 'Jia Yi'
 })
})

app.get('/weather', (req, res) => {
 if (!req.query.address) {
  return res.send({
   error: 'An address must be provided!'
  })
 }

 geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
  if (error) return res.send({ error })

  forecast(longitude, latitude, (error, forecastData) => {
   if (error) return res.send({ error })
   res.send({
    location,
    forecast: forecastData, 
    address: req.query.address
   })
  })
 })
})

app.get('*', (req, res) => {
 res.render('404', {
  title: '404 Page', 
  errorMessage: 'Page not found', 
  name: 'Jia Yi'
 })
})

app.listen(3000, () => {
 console.log('Server is up on port 3000.')
})