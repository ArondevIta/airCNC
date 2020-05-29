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
const ApprovalController = require('./controllers/ApprovalController')
const RejectionController = require('./controllers/RejectionController')

var jsonParser = bodyParser.json()

routes.post('/sessions', jsonParser, SessionController.store)

routes.get('/spots', jsonParser, SpotController.index)
routes.post('/spots', jsonParser, upload.single('thumbnail'), SpotController.store)

routes.get('/dashboard', jsonParser, DashboardController.show)

routes.post('/spots/:spot_id/bookings', jsonParser, BookingController.store)

routes.post('/bookings/:booking_id/approvals', ApprovalController.store )
routes.post('/bookings/:booking_id/rejections', RejectionController.store)
module.exports = routes
