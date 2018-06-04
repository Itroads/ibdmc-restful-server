'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateSchema = new Schema({
  name: { type: String, required: true, unique: true },
  img: { type: String },
  created: { type: Date, default: Date.now },
  data: {
    any: {
      border: { any: {} },
      options: { any: {} }
    }
  },
})

const templateModel = mongoose.model('templateModel', templateSchema)

export default templateModel
