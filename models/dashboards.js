'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const dashboardSchema = new Schema({
  name: { type: String, required: true, unique: true },
  root: {
    background: { type: String, required: true }
  },
  data: {
    layout: [
      {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        w: { type: Number, required: true },
        h: { type: Number, required: true },
        i: { type: String, required: true },
        componentList: { type: Array, required: true },
        bgstyle: { type: Object },
      }
    ],
    config: {
      draggable: { type: Boolean },
      resizeable: { type: Boolean },
      margin_size: [{ type: Number }],
      row_height: { type: Number, required: true },
      col_number: { type: Number, required: true },
    },
  },
  created: { type: Date, default: Date.now }
})

const dashboardModel = mongoose.model('dashboardModel', dashboardSchema)

export default dashboardModel
