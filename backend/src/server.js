const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')


const app = express()

mongoose.connect(
    'mongodb+srv://aron:omnistack@cluster0-f663i.mongodb.net/semana09?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

app.use(routes)
app.use(express.json())


app.listen(3333)

