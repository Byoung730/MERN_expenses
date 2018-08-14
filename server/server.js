const express = require('express')
const router = require('./routes/routes.js')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../client'))
app.use(express.static(path.join(__dirname, '../client')))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))

const options = {
  // autoIndex: false,
  reconnectTries: 100,
  reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0,
  useNewUrlParser: true
}

mongoose
  .connect(
    'mongodb://127.0.0.1:27017/expenseManager',
    options
  )
  .then(
    () => {
      console.log('connected to mongoDB, you beautiful soul')
    },
    err => {
      console.log('err', err)
    }
  )

app.use('/', router)

module.exports = app
