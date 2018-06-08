'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const dashboardSchema = new Schema({
  name: { type: String, required: true, unique: true },
  root: {
    config: {},
    background: {}
  },
  data: [],
  created: { type: Date, default: Date.now }
})

const dashboardModel = mongoose.model('dashboardModel', dashboardSchema)

export default dashboardModel
