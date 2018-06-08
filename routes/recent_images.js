'use strict'

import express from 'express'
import recentImageController from '../controller/recent_images'

const router = express.Router()

/*
 * Restful api:  /recent_image/list
 * Description:  返回所有最近上传的图片
*/
router.get('/list', recentImageController.getRecentImagesList)

/*
 * Restful api:  /recent_image/delete
 * Description:  根据_id 删除图片
*/
router.get('/delete/:id/:filename', recentImageController.deteleRecentImage)

export default router
