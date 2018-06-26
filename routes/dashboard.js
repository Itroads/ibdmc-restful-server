'use strict'

import express from 'express'
import dashboardController from '../controller/dashboard'

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
 * Restful api:  /dashboard/delete
 * Description:  通过名字，判断是否已经存在
*/
router.get('/delete/:id', dashboardController.deleteDashboard)

/*
 * Restful api:  /dashboard/update
 * Description:  通过名字，判断是否已经存在
*/
router.post('/update', dashboardController.updateOneDashboard)

export default router
