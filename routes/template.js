'use strict'

import express from 'express'
import templateController from '../controller/template'

const router = express.Router()

/*
 * Restful api:  /template/list
 * Description: 返回所有 dashboard模板 数据
*/
router.get('/list', templateController.getTemplateList)

export default router
