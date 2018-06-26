'use strict'

import mongodb from 'mongodb'
import dashboardModel from '../models/dashboards'
import recentImageModel from '../models/recent_images'

const ObjectId = mongodb.ObjectId

class Dashboard {
  // 这里构造函数，采用默认添加空的

  async updateOneDashboard (req, res, next) {
    try {
      let id = req.body.id
      delete req.body['id']
      let updateRes = await dashboardModel.update({ "_id": ObjectId(id) }, req.body).exec()
      console.log('updateRes= ', updateRes)
      res.json({
        result: true,
        data: updateRes,
        message: '更新成功'
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

  async deleteDashboard (req, res, next) {
    try {
      let delres = await dashboardModel.deleteOne({ "_id": ObjectId(req.params.id) })
      res.json({
        result: true,
        message: '删除成功'
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
