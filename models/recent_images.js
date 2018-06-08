'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const recentImageSchema = new Schema({
  originalname: { type: String, required: true },
  filename: { type: String, required: true },
  created: { type: Date, default: Date.now }
})

const recentImageModel = mongoose.model('recentImageModel', recentImageSchema)

export default recentImageModel
