'use strict'

import mongodb from 'mongodb'
import fs from 'fs'
import path from 'path'
import { URL } from 'url'
import recentImageModel from '../models/recent_images'

const ObjectId = mongodb.ObjectId
const uploadDir = path.resolve(__dirname, '../upload')

class RecentImage {
  async getRecentImagesList (req, res, next) {
    try {
      await recentImageModel.find({}, (err, docs) => {
        if (err) {
          throw new Error('获取失败')
        } else {
          res.json({
            result: true,
            data: docs,
            message: '最近上传图片列表获取成功',
          })
          res.end()
        }
      })
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
      let Mquery = await recentImageModel.deleteOne({ "_id": ObjectId(req.params.id)}, (err) => {
        if(err) {
          throw new Error(err)
        } else {
          const fileurl = new URL(req.params.filename, 'http://localhost:3030')
          console.log(uploadDir + '/' + req.params.filename)
          if (fs.existsSync(uploadDir + '/' + req.params.filename)) {
            fs.unlink(uploadDir + '/' + req.params.filename, function (e) {
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


        }
      })
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
