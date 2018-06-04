'use strict'

import express from 'express'
import multer from 'multer'
import dashboardController from '../controller/dashboard'

const upload = multer({
  dest: './upload'
})
const router = express.Router()

/*
 * Restful api:  /dashboard/list
 * Description:  返回自定义的所有 dashboard
*/
router.get('/list', dashboardController.getDashboardList)

/*
 * Restful api:  /dashboard/create
 * Description:  创建 dashboard， 并判断是否已经存在
*/
router.post('/create', dashboardController.createDashboard)

/*
 * Restful api:  /dashboard/ishad
 * Description:  通过名字，判断是否已经存在
*/
router.post('/ishad', dashboardController.isHadDashboard)

/*
 * Restful api:  /dashboard/upload
 * Description:  通过名字，判断是否已经存在
*/
router.post('/upload', upload.single('bgImage'), dashboardController.uploadImage)

export default router
