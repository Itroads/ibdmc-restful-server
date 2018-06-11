'use strict'

import dashboardModel from '../models/dashboards'
import recentImageModel from '../models/recent_images'

class Dashboard {
  // 这里构造函数，采用默认添加空的

  async uploadImage (req, res, next) {
    try {
      // 上传图片的时候，要考虑滚动删除   这里先不做
      await recentImageModel.create({
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

  async isHadDashboard (req, res, next) {
    try {
      let isHadQuery = await dashboardModel.findOne({ name: req.body.name })
      if (!isHadQuery) {
        res.json({
          result: true,
          message: req.body.name + '可以使用'
        })
        res.end()
      } else {
        res.status(201).send(req.body.name + '已存在');
        res.end()
      }
    } catch (error) {
      res.json({
        result: false,
        message: error,
      })
      res.end()
    }
  }

  async createDashboard (req, res, next) {
    try {
      let isHadQuery = await dashboardModel.findOne({name: req.body.name})
      if (!isHadQuery) {
        let result = await dashboardModel.create(req.body)
        res.json({
          result: true,
          data: result,
          message: '创建成功',
        })
        res.end()
      } else {
        res.status(201).send(req.body.name + '已存在');
        res.end()
      }
    } catch (error) {
      res.json({
        result: false,
        message: error
      })
      res.end()
    }
  }

  async getDashboardList (req, res, next) {
    try {
      let result = await dashboardModel.find({})
      res.json({
        result: true,
        data: result,
        message: 'dashboard列表获取成功',
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
}

export default new Dashboard()
