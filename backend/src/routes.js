const express = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload')
const bodyParser = require('body-parser'); 

const routes = express.Router()
const upload = multer(uploadConfig)

const BookingController = require('./controllers/BookingController')
const DashboardController = require('./controllers/DashboardController')
const SessionController = require('./controllers/SessionController')
const SpotController = require('./controllers/SpotController')

var jsonParser = bodyParser.json()

routes.post('/sessions', jsonParser, SessionController.store)

routes.get('/spots', jsonParser, SpotController.index)
routes.post('/spots', jsonParser, upload.single('thumbnail'), SpotController.store)

routes.get('/dashboard', jsonParser, DashboardController.show)

routes.post('/spots/:spot_id/bookings', jsonParser, BookingController.store)
module.exports = routes
