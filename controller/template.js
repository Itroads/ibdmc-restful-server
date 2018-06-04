'use strict'

import templateModel from '../models/templates'

class Template {
  async getTemplateList (req, res, next) {
    try {
      await templateModel.find({}, (err, docs) => {
        if (err) {
          throw new Error('获取失败')
        } else {
          res.json({
            result: true,
            data: docs,
            message: '模板列表获取成功',
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

export default new Template()
