'use strict'

import express from 'express'
import multer from 'multer'
import recentImageController from '../controller/recent_images'

const router = express.Router()

const storage = multer.diskStorage({
  // dest: './upload'
  destination: './upload',
  filename: (req, file, cb) => {
    let extend = ''
    switch (file.mimetype) {
      case 'image/png':
        extend = '.png'
        break;
      case 'image/jpeg':
        extend = '.jpeg'
        break;
      case 'image/gif':
        extend = '.gif'
        break;
      default:
        break;
    }
    cb(null, file.fieldname + '-' + Date.now() + extend)
  }
})
const upload = multer({ storage: storage })

/*
 * Restful api:  /recent_image/list
 * Description:  返回所有最近上传的图片
*/
router.get('/list/:type', recentImageController.getRecentImagesList)

/*
 * Restful api:  /recent_image/delete
 * Description:  根据_id 删除图片
*/
router.get('/delete/:id/:filename', recentImageController.deteleRecentImage)

/*
 * Restful api:  /recent_image/upload
 * Description:  通过名字，判断是否已经存在
*/
router.post('/upload', upload.single('ibdmc'), recentImageController.uploadImage)

export default router
