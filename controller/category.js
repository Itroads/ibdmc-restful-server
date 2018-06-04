'use strict'

import mongodb from 'mongodb'
import CategoryModel from '../models/category'

let ObjectId = mongodb.ObjectId

class Category {
  constructor (){

  }

  async createCategory (req, res, next) {
    try {
      let resData = await CategoryModel.create(req.body.form)
        .catch((e) => {
          console.log(e)
        })
      if (resData) {
        res.json({
          status: 1,
          message: '分类创建成功',
          data: resData
        })
      } else {
        throw new Error('该分类已存在')
      }
      res.end()
    } catch (e) {
      res.json({
        status: 0,
        message: e
      })
      res.end()
    }

  }

  async deleteCategory(req, res, next) {
    try {
      await CategoryModel.deleteOne({ "name": req.body.name }, function (err) {
        if(err){
          throw new Error('删除失败')
        } else {
          res.json({
            status: 1,
            message: '删除成功',
          })
        }
      })
      res.end()
    } catch (e) {
      res.json({
        status: 0,
        message: e
      })
      res.end()
    }
  }

  async updateCategory(req, res, next) {
    try {
      console.log(req.body)
      await CategoryModel.updateOne({_id: req.body.id}, req.body.form, function (err, doc) {
        if(err){
          res.json({
            status: 0,
            message: 'error'
          })
        } else {
          res.json({
            data: doc,
            status: 1,
            message: '修改成功',
          })
        }

      })
    } catch (error) {
      res.json({
        status: 0,
        message: error
      })
    }
  }

  async getOneCategory(req, res, next) {
    try {
      let one_category = await CategoryModel.findOne({ "_id": ObjectId(req.params.id)}, function (err, doc) {
        if(err) {
          res.json({
            status: 0,
            message: 'error'
          })
          res.end()
        } else {
          res.json({
            data: doc,
            status: 1,
            message: 'success',
          })
          res.end()
        }
      })
    } catch (error) {
      res.json({
        status: 0,
        message: 'error'
      })
    }
  }

  async getCategoryList(req, res, next) {
    try {
      let list = await CategoryModel.find()
      res.json({
        data: list.reverse(),
        status: 1,
        message: '分类列表获取成功',
      })
      res.end()
    } catch (e) {
      console.log('分类列表获取失败', e)
      res.json({
        status: 0,
        message: '分类列表获取失败'
      })
      res.end()
    }
  }
}

export default new Category()
