'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema

// type:  0 - 根容器背景图(Max: 6)  1 - 子容器背景图(Max: 10)  2 - head 组件背景图(Max: 6)
const recentImageSchema = new Schema({
  type: { type: Number, required: true },
  originalname: { type: String, required: true },
  filename: { type: String, required: true },
  created: { type: Date, default: Date.now }
})

const recentImageModel = mongoose.model('recentImageModel', recentImageSchema)

export default recentImageModel
