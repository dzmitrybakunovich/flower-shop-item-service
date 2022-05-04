const Router = require('express')
const router = new Router()
const categoryController = require('../controller/categoryController')

router.post('/', categoryController.create)
router.delete('/', categoryController.delete)
router.put('/', categoryController.update)
router.get('/', categoryController.getAll)

module.exports = router