'use strict'

import templateModel from '../models/templates'

class Template {
  async getTemplateList (req, res, next) {
    try {
      let templist = await templateModel.find({})
      res.json({
        result: true,
        data: templist,
        message: '模板列表获取成功',
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

export default new Template()
