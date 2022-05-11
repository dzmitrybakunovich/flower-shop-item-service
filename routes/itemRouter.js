const Router = require('express')
const router = new Router()
const itemController = require('../controller/itemController')
const cloudinary = require('../cloudinary/cloudinaryConfig')
// const multer = require('../cloudinary/multerConfig')

const cloudinaryConfig = cloudinary.cloudinaryConfig
// const multerUpload = multer.multerUpload

router.post('/', cloudinaryConfig, itemController.create)
router.delete('/', itemController.delete)
router.put('/', cloudinaryConfig, itemController.update)
router.get('/:id',itemController.getOne);
router.get('/', itemController.getAll);
router.get('/fav/', itemController.getFav);

module.exports = router