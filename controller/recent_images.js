'use strict'

import mongodb from 'mongodb'
import fs from 'fs'
import path from 'path'
import recentImageModel from '../models/recent_images'

const ObjectId = mongodb.ObjectId
const uploadDir = path.resolve(__dirname, '../upload')

class RecentImage {

  async uploadImage(req, res, next) {
    try {
      // 上传图片的时候，要考虑滚动删除   这里先不做
      await recentImageModel.create({
        type: req.body.type,
        originalname: req.file.originalname,
        filename: req.file.filename
      })
      res.json({
        result: true,
        data: {
          img: req.file.filename
        },
        message: req.file.originalname + ' 上传成功'
      })
      res.end()
    } catch (error) {
      res.json({
        result: false,
        message: error,
      })
      res.end()
    }
  }

  async getRecentImagesList (req, res, next) {
    try {
      let imagelist = await recentImageModel.find({"type": req.params.type})
      res.json({
        result: true,
        data: imagelist,
        message: '最近上传图片列表获取成功',
      })
      res.end()
    } catch (error) {
      res.json({
        result: false,
        message: error
      })
      res.end()
    }
  }

  async deteleRecentImage (req, res, next) {
    try {
      let Mquery = await recentImageModel.deleteOne({ "_id": ObjectId(req.params.id)})
      if (fs.existsSync(uploadDir + '/' + req.params.filename)) {
        let del = await fs.unlink(uploadDir + '/' + req.params.filename, function (e) {
          if (e) {
            console.log(e)
          } else {
            res.json({
              result: true,
              data: Mquery,
              message: '删除成功',
            })
            res.end()
          }
        })
      }
    } catch (error) {
      res.json({
        result: false,
        message: error
      })
      res.end()
    }
  }
}

export default new RecentImage()
