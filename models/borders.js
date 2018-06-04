'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const borderSchema = new Schema({
  name: { type: String, required: true, unique: true },
  data: {
    any: {}
  },
  created: { type: Date, default: Date.now }
})

const borderModel = mongoose.model('borderModel', borderSchema)

export default borderModel
