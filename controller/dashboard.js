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
      let isHadQuery = await dashboardModel.findOne({ name: req.body.name }, (err, docs) => {
        if (err) {
          res.status(500).send(req.body.name + '查询失败');
          res.end()
        } else if(docs) {
          res.status(201).send(req.body.name + '已存在');
          res.end()
        }
      })
      if (!isHadQuery) {
        res.json({
          result: true,
          message: req.body.name + '可以使用'
        })
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
      let isHadQuery = await dashboardModel.findOne({name: req.body.name}, (err, docs) => {
        if(err) {
          res.json({
            result: false,
            message: err,
          })
          res.end()
        }
      })
      if (!isHadQuery) {
        await dashboardModel.create(req.body, function (err, createddoc) {
          if (err) {
            throw new Error('创建失败: ' + err)
          } else {
            res.json({
              result: true,
              data: createddoc,
              message: '创建成功',
            })
            res.end()
          }
        })
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
      await dashboardModel.find({}, function (err, docs) {
        if (err) {
          console.log(err)
          throw new Error('获取dashboard列表失败')
        } else {
          res.json({
            result: true,
            data: docs,
            message: 'dashboard列表获取成功',
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
}

export default new Dashboard()
