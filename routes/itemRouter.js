const Router = require('express')
const router = new Router()
const itemController = require('../controller/itemController')
const cloudinary = require('../cloudinary/cloudinaryConfig')
const multer = require('../cloudinary/multerConfig')

const cloudinaryConfig = cloudinary.cloudinaryConfig
const multerUpload = multer.multerUpload

router.post('/', cloudinaryConfig, itemController.create)
router.get('/', itemController.getAll)
router.get('/:id', itemController.getOne)

module.exports = router